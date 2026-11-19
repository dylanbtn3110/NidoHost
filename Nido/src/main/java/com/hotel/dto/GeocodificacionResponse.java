package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Coordenadas sugeridas para una direccion (US04). El propietario debe confirmarlas antes de guardar. */
public record GeocodificacionResponse(
        @Schema(description = "Dirección enviada por el usuario", example = "Malecon de la Reserva 610, Miraflores")
        String direccionConsultada,
        @Schema(description = "Dirección que encontró el servicio de mapas",
                example = "Malecón de la Reserva, Miraflores, Lima, Perú")
        String direccionEncontrada,
        @Schema(description = "Latitud sugerida", example = "-12.1318") Double latitud,
        @Schema(description = "Longitud sugerida", example = "-77.0300") Double longitud,
        @Schema(description = "Servicio que respondió", example = "OpenStreetMap Nominatim") String fuente) {
}
