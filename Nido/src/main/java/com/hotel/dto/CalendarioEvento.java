package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

/** Un evento del calendario (US08): una reserva o un servicio programado. */
public record CalendarioEvento(
        @Schema(description = "RESERVA o SERVICIO", example = "RESERVA") String tipo,
        @Schema(description = "Id de la reserva o del servicio, según el tipo", example = "5") Integer id,
        @Schema(description = "Id del alojamiento", example = "1") Integer idAlojamiento,
        @Schema(description = "Nombre del alojamiento", example = "Departamento Miraflores Vista Mar")
        String alojamiento,
        @Schema(description = "Entrada de la reserva o inicio del servicio", example = "2026-10-11T14:00:00")
        LocalDateTime inicio,
        @Schema(description = "Salida de la reserva o fin del servicio", example = "2026-10-12T11:00:00")
        LocalDateTime fin,
        @Schema(description = "Estado de la reserva o del servicio", example = "CONFIRMADA") String estado,
        @Schema(description = "Huésped (reservas) o tipo y personal (servicios)", example = "Huesped: Ana Ruiz (Airbnb)")
        String detalle) {
}
