package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/** Cuerpo de los PATCH .../estado, por ejemplo {"estado": "INACTIVO"}. */
@Schema(description = "Nuevo estado del recurso")
public record EstadoRequest(
        @NotBlank(message = "El estado es obligatorio")
        @Schema(description = "Usuarios y personal: ACTIVO o INACTIVO. Servicios: ASIGNADO, ACEPTADO, "
                + "RECHAZADO, EN_PROCESO, COMPLETADO o CANCELADO. Incidencias: ABIERTA, EN_PROCESO, "
                + "RESUELTA o CERRADA",
                example = "ACTIVO")
        String estado) {
}
