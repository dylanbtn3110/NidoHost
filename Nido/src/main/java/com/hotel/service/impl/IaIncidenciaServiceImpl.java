package com.hotel.service.impl;

import com.hotel.dto.ModeloIaResponse;
import com.hotel.dto.SugerenciaIncidenciaResponse;
import com.hotel.entity.Incidencia;
import com.hotel.exception.ReglaNegocioException;
import com.hotel.ia.NaiveBayesTexto;
import com.hotel.ia.Tokenizador;
import com.hotel.repository.IncidenciaRepository;
import com.hotel.service.IaIncidenciaService;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * IA de incidencias (US17): sugiere la categoria y la prioridad a partir de la descripcion.
 * Se entrena al iniciar con el archivo de ejemplos y con las incidencias ya registradas, asi que mejora
 * a medida que se usa el sistema (reentrenar).
 */
@Service
public class IaIncidenciaServiceImpl implements IaIncidenciaService {

    private static final String NOMBRE_MODELO = "Naive Bayes multinomial (implementacion propia)";
    /** Prioridades de menor a mayor, para medir cuantos niveles se equivoca el modelo. */
    private static final List<String> NIVELES = List.of("BAJA", "MEDIA", "ALTA", "CRITICA");
    private static final String ARCHIVO_EJEMPLOS = "ia/incidencias-entrenamiento.csv";

    private final IncidenciaRepository incidenciaRepository;
    private volatile Modelo modelo;

    public IaIncidenciaServiceImpl(IncidenciaRepository incidenciaRepository) {
        this.incidenciaRepository = incidenciaRepository;
    }

    @PostConstruct
    void iniciar() {
        reentrenar();
    }

    @Override
    public SugerenciaIncidenciaResponse sugerir(String descripcion) {
        List<String> palabras = Tokenizador.caracteristicas(descripcion);
        if (palabras.isEmpty()) {
            throw new ReglaNegocioException("La descripcion no tiene palabras que el modelo pueda analizar.",
                    HttpStatus.BAD_REQUEST);
        }
        Modelo actual = modelo;
        NaiveBayesTexto.Prediccion categoria = actual.categoria().predecir(palabras);
        NaiveBayesTexto.Prediccion prioridad = actual.prioridad().predecir(palabras);
        Set<String> claves = new LinkedHashSet<>(categoria.palabrasClave());
        claves.addAll(prioridad.palabrasClave());
        // Los grupos del dominio (g_..., a_...) son internos: solo se muestran las palabras reales
        List<String> visibles = claves.stream().filter(c -> !c.startsWith("g_") && !c.startsWith("a_")).limit(5).toList();
        return new SugerenciaIncidenciaResponse(categoria.clase(), redondear(categoria.confianza()),
                prioridad.clase(), redondear(prioridad.confianza()), visibles, NOMBRE_MODELO);
    }

    @Override
    public ModeloIaResponse informacionModelo() {
        return modelo.ficha();
    }

    @Override
    public ModeloIaResponse reentrenar() {
        List<Ejemplo> ejemplos = new ArrayList<>(leerEjemplosDelArchivo());
        int delArchivo = ejemplos.size();
        Set<String> vistos = new HashSet<>();
        ejemplos.forEach(e -> vistos.add(String.join(" ", e.palabras())));
        for (Incidencia incidencia : incidenciaRepository.findAll()) {
            Ejemplo ejemplo = Ejemplo.de(incidencia.getCategoria(), incidencia.getPrioridad(), incidencia.getDescripcion());
            if (ejemplo != null && vistos.add(String.join(" ", ejemplo.palabras()))) {
                ejemplos.add(ejemplo);
            }
        }
        int delaBase = ejemplos.size() - delArchivo;

        NaiveBayesTexto categoria = entrenar(ejemplos, -1, true);
        NaiveBayesTexto prioridad = entrenar(ejemplos, -1, false);
        double[] precision = validarDejandoUnoFuera(ejemplos);
        ModeloIaResponse ficha = new ModeloIaResponse(NOMBRE_MODELO, ejemplos.size(), delaBase,
                redondear(precision[0]), redondear(precision[1]), redondear(precision[2]),
                List.copyOf(categoria.clases()), List.copyOf(prioridad.clases()), LocalDateTime.now());
        modelo = new Modelo(categoria, prioridad, ficha);
        return ficha;
    }

    /** Entrena un modelo; si 'omitir' es un indice, ese ejemplo queda fuera (para medir la precision). */
    private NaiveBayesTexto entrenar(List<Ejemplo> ejemplos, int omitir, boolean porCategoria) {
        NaiveBayesTexto nb = new NaiveBayesTexto();
        for (int i = 0; i < ejemplos.size(); i++) {
            if (i != omitir) {
                Ejemplo e = ejemplos.get(i);
                nb.entrenar(porCategoria ? e.categoria() : e.prioridad(), e.palabras());
            }
        }
        return nb;
    }

    /**
     * Validacion dejando uno fuera: predice cada ejemplo con un modelo entrenado sin el.
     * Devuelve [categoria, prioridad exacta, prioridad con un nivel de diferencia como maximo].
     */
    private double[] validarDejandoUnoFuera(List<Ejemplo> ejemplos) {
        int aciertosCategoria = 0;
        int aciertosPrioridad = 0;
        int aciertosCercanos = 0;
        for (int i = 0; i < ejemplos.size(); i++) {
            Ejemplo e = ejemplos.get(i);
            if (entrenar(ejemplos, i, true).predecir(e.palabras()).clase().equals(e.categoria())) {
                aciertosCategoria++;
            }
            String prioridadPredicha = entrenar(ejemplos, i, false).predecir(e.palabras()).clase();
            if (prioridadPredicha.equals(e.prioridad())) {
                aciertosPrioridad++;
            }
            int distancia = Math.abs(NIVELES.indexOf(prioridadPredicha) - NIVELES.indexOf(e.prioridad()));
            if (NIVELES.contains(prioridadPredicha) && NIVELES.contains(e.prioridad()) && distancia <= 1) {
                aciertosCercanos++;
            }
        }
        double total = ejemplos.size();
        return new double[]{aciertosCategoria / total, aciertosPrioridad / total, aciertosCercanos / total};
    }

    private List<Ejemplo> leerEjemplosDelArchivo() {
        List<Ejemplo> ejemplos = new ArrayList<>();
        try (BufferedReader lector = new BufferedReader(new InputStreamReader(
                new ClassPathResource(ARCHIVO_EJEMPLOS).getInputStream(), StandardCharsets.UTF_8))) {
            String linea;
            while ((linea = lector.readLine()) != null) {
                if (linea.isBlank() || linea.startsWith("#")) {
                    continue;
                }
                String[] partes = linea.split(";", 3);
                Ejemplo ejemplo = partes.length == 3 ? Ejemplo.de(partes[0], partes[1], partes[2]) : null;
                if (ejemplo != null) {
                    ejemplos.add(ejemplo);
                }
            }
        } catch (IOException e) {
            throw new IllegalStateException("No se pudo leer el archivo de entrenamiento " + ARCHIVO_EJEMPLOS, e);
        }
        return ejemplos;
    }

    private static double redondear(double valor) {
        return Math.round(valor * 100) / 100.0;
    }

    private record Modelo(NaiveBayesTexto categoria, NaiveBayesTexto prioridad, ModeloIaResponse ficha) {
    }

    private record Ejemplo(String categoria, String prioridad, List<String> palabras) {
        static Ejemplo de(String categoria, String prioridad, String descripcion) {
            if (categoria == null || categoria.isBlank() || prioridad == null || prioridad.isBlank()) {
                return null;
            }
            List<String> palabras = Tokenizador.caracteristicas(descripcion);
            return palabras.isEmpty() ? null : new Ejemplo(categoria.trim().toUpperCase(), prioridad.trim().toUpperCase(), palabras);
        }
    }
}
