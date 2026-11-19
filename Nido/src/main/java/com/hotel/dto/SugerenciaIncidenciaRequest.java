package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Descripcion de la incidencia sobre la que se pide la sugerencia de la IA (US17). */
public record SugerenciaIncidenciaRequest(
        @NotBlank(message = "La descripcion es obligatoria")
        @Size(min = 5, max = 500, message = "La descripcion debe tener entre 5 y 500 caracteres")
        @Schema(description = "Texto libre con lo ocurrido (5 a 500 caracteres)",
                example = "Olor a gas en la cocina, se cerró la llave general")
        String descripcion) {
}
