package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

/** Categoria y prioridad sugeridas, con la confianza (0 a 1) y las palabras que más pesaron en la decision. */
public record SugerenciaIncidenciaResponse(
        @Schema(description = "Categoría sugerida: MANTENIMIENTO, LIMPIEZA, DANO, SEGURIDAD u OTRO",
                example = "MANTENIMIENTO")
        String categoria,
        @Schema(description = "Confianza de la categoría, de 0 a 1", example = "0.87")
        double confianzaCategoria,
        @Schema(description = "Prioridad sugerida: BAJA, MEDIA, ALTA o CRITICA", example = "CRITICA")
        String prioridad,
        @Schema(description = "Confianza de la prioridad, de 0 a 1", example = "0.64")
        double confianzaPrioridad,
        @Schema(description = "Palabras de la descripción que más pesaron en la decisión",
                example = "[\"gas\", \"cocina\"]")
        List<String> palabrasClave,
        @Schema(description = "Modelo que generó la sugerencia",
                example = "Naive Bayes multinomial (implementacion propia)")
        String modelo) {
}
