package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Schema(description = "Indicadores operativos del periodo (US15)")
public record ReporteOperacionResponse(
        @Schema(description = "Inicio del periodo", example = "2026-10-01") LocalDate fechaInicio,
        @Schema(description = "Fin del periodo", example = "2026-10-31") LocalDate fechaFin,
        @Schema(description = "Cantidad de servicios por estado",
                example = "{\"COMPLETADO\": 8, \"EN_PROCESO\": 2}")
        Map<String, Long> serviciosPorEstado,
        @Schema(description = "Servicios del periodo con evidencia fotográfica completa e incompleta")
        Evidencia evidencia,
        @Schema(description = "Servicios cuyo fin ya venció y no están finalizados")
        Atrasos atrasos,
        @Schema(description = "Cantidad de incidencias por prioridad",
                example = "{\"ALTA\": 3, \"MEDIA\": 5}")
        Map<String, Long> incidenciasPorPrioridad) {

    public record Evidencia(
            @Schema(description = "Servicios con evidencia completa", example = "7") long completa,
            @Schema(description = "Servicios con evidencia incompleta", example = "3") long incompleta) {
    }

    public record Atrasos(
            @Schema(description = "Cantidad de servicios atrasados", example = "1") long cantidad,
            @Schema(description = "Detalle de los servicios atrasados") List<ServicioAtrasado> servicios) {
    }

    public record ServicioAtrasado(
            @Schema(description = "Id del servicio", example = "12") Integer idServicio,
            @Schema(description = "LIMPIEZA, MANTENIMIENTO o INSPECCION", example = "LIMPIEZA") String tipo,
            @Schema(description = "Estado actual del servicio", example = "EN_PROCESO") String estado,
            @Schema(description = "Inicio programado", example = "2026-10-12T09:00:00") LocalDateTime inicio,
            @Schema(description = "Fin programado", example = "2026-10-12T12:00:00") LocalDateTime fin) {
    }
}