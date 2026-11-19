package com.hotel.service;

import com.hotel.dto.ModeloIaResponse;
import com.hotel.dto.SugerenciaIncidenciaResponse;
import com.hotel.entity.Incidencia;
import com.hotel.exception.ReglaNegocioException;
import com.hotel.repository.IncidenciaRepository;
import com.hotel.service.impl.IaIncidenciaServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.HttpStatus;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

/** IA de incidencias: sugiere categoria y prioridad (US17). */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class IaIncidenciaServiceImplTest {

    @Mock private IncidenciaRepository incidenciaRepository;
    private IaIncidenciaServiceImpl iaService;

    @BeforeEach
    void preparar() {
        when(incidenciaRepository.findAll()).thenReturn(List.of());
        iaService = new IaIncidenciaServiceImpl(incidenciaRepository);
        iaService.reentrenar();
    }

    @Test
    @DisplayName("Un olor a gas se sugiere como mantenimiento de prioridad critica")
    void gasEsCritico() {
        SugerenciaIncidenciaResponse sugerencia = iaService.sugerir("Huele a gas en la cocina");

        assertThat(sugerencia.categoria()).isEqualTo("MANTENIMIENTO");
        assertThat(sugerencia.prioridad()).isEqualTo("CRITICA");
        assertThat(sugerencia.palabrasClave()).contains("gas");
    }

    @Test
    @DisplayName("Falta de insumos se sugiere como limpieza de prioridad baja")
    void faltaDeJabonEsLimpiezaBaja() {
        SugerenciaIncidenciaResponse sugerencia = iaService.sugerir("Falta jabon en el lavadero");

        assertThat(sugerencia.categoria()).isEqualTo("LIMPIEZA");
        assertThat(sugerencia.prioridad()).isEqualTo("BAJA");
    }

    @Test
    @DisplayName("Un intento de ingreso de desconocidos se sugiere como seguridad")
    void desconocidosEsSeguridad() {
        assertThat(iaService.sugerir("Alguien desconocido intento abrir la puerta").categoria()).isEqualTo("SEGURIDAD");
    }

    @Test
    @DisplayName("La confianza va de 0 a 1 y no se muestran los grupos internos del modelo")
    void respuestaLimpia() {
        SugerenciaIncidenciaResponse sugerencia = iaService.sugerir("La television quedo con la pantalla rota");

        assertThat(sugerencia.confianzaCategoria()).isBetween(0.0, 1.0);
        assertThat(sugerencia.confianzaPrioridad()).isBetween(0.0, 1.0);
        assertThat(sugerencia.palabrasClave()).noneMatch(p -> p.startsWith("g_") || p.startsWith("a_"));
    }

    @Test
    @DisplayName("Una descripcion sin palabras utiles se rechaza con 400")
    void descripcionSinPalabras() {
        assertThatThrownBy(() -> iaService.sugerir("   "))
                .isInstanceOf(ReglaNegocioException.class)
                .satisfies(e -> assertThat(((ReglaNegocioException) e).getStatus()).isEqualTo(HttpStatus.BAD_REQUEST));
    }

    @Test
    @DisplayName("El modelo acierta mas que al azar al validarlo dejando un ejemplo fuera")
    void precisionDelModelo() {
        ModeloIaResponse ficha = iaService.informacionModelo();

        assertThat(ficha.muestras()).isGreaterThan(100);
        assertThat(ficha.precisionCategoria()).isGreaterThan(0.6);      // azar: 0.20 (5 categorias)
        assertThat(ficha.precisionPrioridadCercana()).isGreaterThan(0.75);
        assertThat(ficha.categorias()).contains("MANTENIMIENTO", "LIMPIEZA", "DANO", "SEGURIDAD", "OTRO");
    }

    @Test
    @DisplayName("Al reentrenar usa tambien las incidencias registradas en la base de datos")
    void aprendeDeLasIncidenciasRegistradas() {
        Incidencia nueva = new Incidencia();
        nueva.setCategoria("OTRO");
        nueva.setPrioridad("BAJA");
        nueva.setDescripcion("El huesped pregunta si hay secadora de pelo");
        when(incidenciaRepository.findAll()).thenReturn(List.of(nueva));

        ModeloIaResponse ficha = iaService.reentrenar();

        assertThat(ficha.muestrasDeLaBaseDeDatos()).isEqualTo(1);
    }
}
