package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "Resultado del inicio de sesión: token JWT, datos del usuario y su menú")
public record LoginResponse(
        @Schema(description = "Token JWT; envíelo en el header Authorization: Bearer <token>",
                example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.firma")
        String token,
        @Schema(description = "Tipo de token", example = "Bearer") String tipo,
        @Schema(description = "Minutos de vigencia del token", example = "120") long expiraEnMinutos,
        @Schema(description = "Id del usuario", example = "1") Integer idusuario,
        @Schema(description = "Nombre de usuario", example = "admin") String login,
        @Schema(description = "Nombres y apellidos", example = "Ana Pérez") String nombres,
        @Schema(description = "Roles del usuario", example = "[\"ADMIN\"]") List<String> roles,
        @Schema(description = "Opciones de menú que el usuario puede ver según sus roles")
        List<OpcionMenu> opciones) {

    /** Opcion de menu que el frontend muestra segun el rol (tabla opcion / rol_has_opcion). */
    @Schema(description = "Opción del menú del frontend")
    public record OpcionMenu(
            @Schema(description = "Texto de la opción", example = "Alojamientos") String nombre,
            @Schema(description = "Ruta del frontend", example = "/alojamientos") String ruta) {
    }
}
