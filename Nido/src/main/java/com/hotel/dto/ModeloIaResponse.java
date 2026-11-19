package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

/** Ficha del modelo de IA: con que datos se entreno y que tan bien acierta (validacion dejando uno fuera; la prioridad "cercana" admite un nivel de diferencia). */
public record ModeloIaResponse(
        @Schema(description = "Algoritmo del modelo", example = "Naive Bayes multinomial (implementacion propia)")
        String modelo,
        @Schema(description = "Total de ejemplos usados para entrenar", example = "130")
        int muestras,
        @Schema(description = "Cuántos de esos ejemplos vienen de incidencias registradas en la base de datos",
                example = "13")
        int muestrasDeLaBaseDeDatos,
        @Schema(description = "Precisión de la categoría, de 0 a 1", example = "0.74")
        double precisionCategoria,
        @Schema(description = "Precisión exacta de la prioridad, de 0 a 1", example = "0.47")
        double precisionPrioridad,
        @Schema(description = "Precisión de la prioridad admitiendo un nivel de diferencia, de 0 a 1",
                example = "0.83")
        double precisionPrioridadCercana,
        @Schema(description = "Categorías que el modelo puede sugerir",
                example = "[\"DANO\", \"LIMPIEZA\", \"MANTENIMIENTO\", \"OTRO\", \"SEGURIDAD\"]")
        List<String> categorias,
        @Schema(description = "Prioridades que el modelo puede sugerir",
                example = "[\"BAJA\", \"MEDIA\", \"ALTA\", \"CRITICA\"]")
        List<String> prioridades,
        @Schema(description = "Fecha y hora del último entrenamiento", example = "2026-11-19T09:30:00")
        LocalDateTime entrenadoEn) {
}
