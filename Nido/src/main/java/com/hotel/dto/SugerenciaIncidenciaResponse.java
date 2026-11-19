package com.hotel.dto;

import java.util.List;

/** Categoria y prioridad sugeridas, con la confianza (0 a 1) y las palabras que más pesaron en la decision. */
public record SugerenciaIncidenciaResponse(
        String categoria,
        double confianzaCategoria,
        String prioridad,
        double confianzaPrioridad,
        List<String> palabrasClave,
        String modelo) {
}
