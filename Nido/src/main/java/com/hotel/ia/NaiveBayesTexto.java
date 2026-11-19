package com.hotel.ia;

import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Clasificador Naive Bayes multinomial para texto con suavizado de Laplace.
 * Para cada clase calcula log P(clase) + suma de log P(palabra | clase) y elige la de mayor puntaje.
 */
public class NaiveBayesTexto {

    private static final double SUAVIZADO = 1.0;

    private final Map<String, Integer> documentos = new LinkedHashMap<>();
    private final Map<String, Map<String, Integer>> frecuencias = new HashMap<>();
    private final Map<String, Integer> totalPalabras = new HashMap<>();
    private final Set<String> vocabulario = new HashSet<>();
    private int totalDocumentos;

    /** Un ejemplo de entrenamiento: las palabras de una descripcion y su clase correcta. */
    public void entrenar(String clase, List<String> palabras) {
        documentos.merge(clase, 1, Integer::sum);
        totalDocumentos++;
        Map<String, Integer> delaClase = frecuencias.computeIfAbsent(clase, c -> new HashMap<>());
        for (String palabra : palabras) {
            delaClase.merge(palabra, 1, Integer::sum);
            totalPalabras.merge(clase, 1, Integer::sum);
            vocabulario.add(palabra);
        }
    }

    public Prediccion predecir(List<String> palabras) {
        if (totalDocumentos == 0) {
            throw new IllegalStateException("El modelo no tiene datos de entrenamiento.");
        }
        List<String> conocidas = palabras.stream().filter(vocabulario::contains).toList();
        Map<String, Double> puntajes = new LinkedHashMap<>();
        for (String clase : documentos.keySet()) {
            double puntaje = Math.log((double) documentos.get(clase) / totalDocumentos);
            for (String palabra : conocidas) {
                puntaje += logProbabilidad(palabra, clase);
            }
            puntajes.put(clase, puntaje);
        }
        List<Map.Entry<String, Double>> ordenadas = puntajes.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed()).toList();
        String mejor = ordenadas.get(0).getKey();
        String segunda = ordenadas.size() > 1 ? ordenadas.get(1).getKey() : null;

        // Probabilidad de la clase elegida frente a las demas (softmax)
        double maximo = ordenadas.get(0).getValue();
        double suma = puntajes.values().stream().mapToDouble(p -> Math.exp(p - maximo)).sum();

        // Palabras que mas empujaron hacia la clase elegida respecto de la segunda
        List<String> claves = conocidas.stream().distinct()
                .map(p -> Map.entry(p, logProbabilidad(p, mejor) - (segunda == null ? 0 : logProbabilidad(p, segunda))))
                .filter(e -> e.getValue() > 0)
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(3).map(Map.Entry::getKey).toList();
        return new Prediccion(mejor, 1 / suma, claves);
    }

    public Set<String> clases() {
        return documentos.keySet();
    }

    private double logProbabilidad(String palabra, String clase) {
        int veces = frecuencias.get(clase).getOrDefault(palabra, 0);
        return Math.log((veces + SUAVIZADO) / (totalPalabras.getOrDefault(clase, 0) + SUAVIZADO * vocabulario.size()));
    }

    public record Prediccion(String clase, double confianza, List<String> palabrasClave) {
    }
}
