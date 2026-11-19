package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Item del checklist de un servicio (US11). Se guarda como lista JSON en servicio.checklist. */
public record ChecklistItem(
        @Schema(description = "Tarea a realizar", example = "Cambiar sabanas y toallas") String item,
        @Schema(description = "Si es obligatorio para poder completar el servicio", example = "true")
        Boolean obligatorio,
        @Schema(description = "Si ya se realizó", example = "false") Boolean hecho) {
}
