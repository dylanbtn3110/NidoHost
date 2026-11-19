package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

/** Resultado de consultar si un alojamiento esta libre en un rango de fechas (US07). */
public record DisponibilidadResponse(
        @Schema(description = "Id del alojamiento consultado", example = "1") Integer idAlojamiento,
        @Schema(description = "Entrada consultada", example = "2026-10-11T14:00:00") LocalDateTime entrada,
        @Schema(description = "Salida consultada", example = "2026-10-12T11:00:00") LocalDateTime salida,
        @Schema(description = "true si no hay reservas activas que se crucen con esas fechas", example = "true")
        boolean disponible,
        @Schema(description = "Reservas activas que se cruzan; vacío si está disponible")
        List<Conflicto> conflictos) {

    public record Conflicto(
            @Schema(description = "Id de la reserva que se cruza", example = "5") Integer idReserva,
            @Schema(description = "Entrada de esa reserva", example = "2026-10-10T14:00:00") LocalDateTime entrada,
            @Schema(description = "Salida de esa reserva", example = "2026-10-12T11:00:00") LocalDateTime salida,
            @Schema(description = "Estado de esa reserva", example = "CONFIRMADA") String estado) {
    }
}
