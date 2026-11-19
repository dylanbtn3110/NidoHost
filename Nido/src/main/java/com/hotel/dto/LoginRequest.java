package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Credenciales para iniciar sesión (US01)")
public record LoginRequest(
        @NotBlank(message = "El login es obligatorio")
        @Schema(description = "Nombre de usuario", example = "admin")
        String login,
        @NotBlank(message = "La contrasena es obligatoria")
        @Schema(description = "Contraseña del usuario", example = "Nido2026!", format = "password")
        String password) {
}
