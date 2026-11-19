package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;

/** Noches ocupadas sobre noches disponibles en el periodo (US14). */
public record ReporteOcupacionResponse(
        @Schema(description = "Inicio del periodo", example = "2026-10-01") LocalDate fechaInicio,
        @Schema(description = "Fin del periodo", example = "2026-10-31") LocalDate fechaFin,
        @Schema(description = "Noches del periodo (ambas fechas inclusive)", example = "31")
        long nochesDelPeriodo,
        @Schema(description = "Ocupación promedio de los alojamientos activos, en porcentaje", example = "58.5")
        double ocupacionPromedio,
        @Schema(description = "Detalle por alojamiento, de mayor a menor ocupación")
        List<PorAlojamiento> porAlojamiento) {

    public record PorAlojamiento(
            @Schema(description = "Id del alojamiento", example = "1") Integer idAlojamiento,
            @Schema(description = "Nombre del alojamiento", example = "Departamento Miraflores Vista Mar")
            String alojamiento,
            @Schema(description = "Noches ocupadas dentro del periodo", example = "18") long nochesOcupadas,
            @Schema(description = "Reservas que caen en el periodo", example = "4") long reservas,
            @Schema(description = "Ocupación del alojamiento, en porcentaje", example = "58.06") double ocupacion) {
    }
}
