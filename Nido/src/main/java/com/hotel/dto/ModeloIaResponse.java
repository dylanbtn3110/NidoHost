package com.hotel.dto;

import java.time.LocalDateTime;
import java.util.List;

/** Ficha del modelo de IA: con que datos se entreno y que tan bien acierta (validacion dejando uno fuera; la prioridad "cercana" admite un nivel de diferencia). */
public record ModeloIaResponse(
        String modelo,
        int muestras,
        int muestrasDeLaBaseDeDatos,
        double precisionCategoria,
        double precisionPrioridad,
        double precisionPrioridadCercana,
        List<String> categorias,
        List<String> prioridades,
        LocalDateTime entrenadoEn) {
}
