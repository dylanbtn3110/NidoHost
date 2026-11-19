package com.hotel.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Descripcion de la incidencia sobre la que se pide la sugerencia de la IA (US17). */
public record SugerenciaIncidenciaRequest(
        @NotBlank(message = "La descripcion es obligatoria")
        @Size(min = 5, max = 500, message = "La descripcion debe tener entre 5 y 500 caracteres")
        String descripcion) {
}
