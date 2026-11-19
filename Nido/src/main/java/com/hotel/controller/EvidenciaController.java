package com.hotel.controller;

import com.hotel.entity.Evidencia;
import com.hotel.service.EvidenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/** Evidencias fotograficas de los servicios (US12). */
@Tag(name = "US12 · Evidencias",
        description = "Fotos de evidencia de los servicios (JPG, PNG o WEBP, máximo 5 MB). Roles: ADMIN, "
                + "PROPIETARIO y PERSONAL (este último solo sobre sus servicios).")
@RestController
@RequestMapping("/api/v1")
public class EvidenciaController {

    private final EvidenciaService evidenciaService;

    public EvidenciaController(EvidenciaService evidenciaService) {
        this.evidenciaService = evidenciaService;
    }

    @Operation(summary = "Listar las evidencias de un servicio",
            description = "Ordenadas por fecha. 404 si el servicio no existe; 403 si no tiene acceso a él.")
    @GetMapping("/servicios/{idServicio}/evidencias")
    public ResponseEntity<List<Evidencia>> listar(@PathVariable Integer idServicio) {
        return ResponseEntity.ok(evidenciaService.listarPorServicio(idServicio));
    }

    /**
     * Subir una foto: multipart/form-data con los campos "archivo" (JPG, PNG o WEBP, maximo 5 MB)
     * e "idUsuario" (quien la registra).
     */
    @Operation(summary = "Subir una foto de evidencia",
            description = "Envíe multipart/form-data con 'archivo' (JPG, PNG o WEBP, máximo 5 MB) e 'idUsuario' "
                    + "(quién registra, debe ser el del token). Sin al menos una foto el servicio no puede "
                    + "pasar a COMPLETADO. Errores: 400 si no adjunta archivo o falta idUsuario; 403 si "
                    + "idUsuario no es el del token o el servicio no es suyo; 404 si el servicio no existe; "
                    + "409 si el servicio ya está COMPLETADO o CANCELADO; 413 si supera 5 MB; 415 si el "
                    + "formato no es JPG, PNG o WEBP.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Evidencia registrada"),
            @ApiResponse(responseCode = "409", description = "El servicio ya está COMPLETADO o CANCELADO"),
            @ApiResponse(responseCode = "413", description = "El archivo supera 5 MB"),
            @ApiResponse(responseCode = "415", description = "Formato no permitido (solo JPG, PNG o WEBP)")
    })
    @PostMapping(value = "/servicios/{idServicio}/evidencias", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Evidencia> subir(
            @PathVariable Integer idServicio,
            @Parameter(description = "Id del usuario que registra la foto; debe ser el del token", example = "4")
            @RequestParam("idUsuario") Integer idUsuario,
            @Parameter(description = "Foto JPG, PNG o WEBP de hasta 5 MB")
            @RequestParam("archivo") MultipartFile archivo) {
        return new ResponseEntity<>(evidenciaService.subir(idServicio, idUsuario, archivo), HttpStatus.CREATED);
    }

    @Operation(summary = "Obtener los datos de una evidencia",
            description = "404 si no existe; 403 si no tiene acceso al servicio.")
    @GetMapping("/evidencias/{id}")
    public ResponseEntity<Evidencia> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(evidenciaService.findById(id));
    }

    /** Descarga la foto para mostrarla en el navegador. */
    @Operation(summary = "Ver la foto de una evidencia",
            description = "Devuelve la imagen para mostrarla en el navegador. 404 si la evidencia no existe o su "
                    + "archivo ya no está en el servidor.")
    @GetMapping("/evidencias/{id}/archivo")
    public ResponseEntity<Resource> descargar(@PathVariable Integer id) {
        Evidencia evidencia = evidenciaService.findById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(evidencia.getTipoArchivo()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + evidencia.getNombreArchivo() + "\"")
                .body(evidenciaService.archivo(evidencia));
    }

    @Operation(summary = "Eliminar una evidencia",
            description = "404 si no existe; 403 si el personal intenta borrar una foto que no subió; 409 si el "
                    + "servicio ya está COMPLETADO.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminada"),
            @ApiResponse(responseCode = "403", description = "El personal solo elimina las fotos que subió"),
            @ApiResponse(responseCode = "409", description = "El servicio ya está COMPLETADO")
    })
    @DeleteMapping("/evidencias/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        evidenciaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
