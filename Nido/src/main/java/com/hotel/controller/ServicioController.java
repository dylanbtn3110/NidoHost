package com.hotel.controller;

import com.hotel.dto.ChecklistItem;
import com.hotel.dto.EstadoRequest;
import com.hotel.entity.Servicio;
import com.hotel.service.ServicioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Servicios de limpieza, mantenimiento e inspeccion (US10, US11). */
@Tag(name = "US10 · Servicios",
        description = "Servicios de limpieza, mantenimiento e inspección con ciclo de estados y checklist "
                + "(US10, US11). Gestión: ADMIN y PROPIETARIO. Ejecución (consultar, cambiar estado y "
                + "checklist): también PERSONAL, solo sobre los servicios que tiene asignados.")
@RestController
@RequestMapping("/api/v1/servicios")
public class ServicioController {

    private final ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @Operation(summary = "Listar servicios",
            description = "Un propietario recibe solo los servicios de sus alojamientos. Roles: ADMIN y "
                    + "PROPIETARIO.")
    @GetMapping
    public ResponseEntity<List<Servicio>> listar() {
        return ResponseEntity.ok(servicioService.findAll());
    }

    /** Servicios asignados al usuario que inicio sesion (vista "Mis tareas" del personal). */
    @Operation(summary = "Listar mis servicios",
            description = "Servicios asignados al usuario del token, ordenados por fecha de inicio (vista 'Mis "
                    + "tareas' del personal). Roles: ADMIN, PROPIETARIO y PERSONAL.")
    @GetMapping("/mis-servicios")
    public ResponseEntity<List<Servicio>> misServicios() {
        return ResponseEntity.ok(servicioService.misServicios());
    }

    @Operation(summary = "Obtener un servicio",
            description = "404 si no existe; 403 si el personal intenta ver un servicio que no tiene asignado o "
                    + "el alojamiento es de otro propietario.")
    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(servicioService.findById(id));
    }

    @Operation(summary = "Registrar un servicio",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. Nace en "
                    + "estado ASIGNADO. tipo: LIMPIEZA, MANTENIMIENTO o INSPECCION. El campo 'personal' "
                    + "(idusuario) debe ser un usuario con rol PERSONAL en estado ACTIVO. Si no se envía "
                    + "checklist se carga uno sugerido según el tipo. Errores: 400 si falta idUsuario, el "
                    + "tipo es inválido, el fin no es posterior al inicio, el usuario no es personal o la "
                    + "reserva no es del alojamiento; 403 si idUsuario no es el del token; 404 si el "
                    + "alojamiento, la reserva o el personal no existen; 409 si el personal está INACTIVO.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Servicio registrado en estado ASIGNADO"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario o datos inválidos"),
            @ApiResponse(responseCode = "409", description = "El personal asignado está INACTIVO")
    })
    @PostMapping
    public ResponseEntity<Servicio> crear(@Valid @RequestBody Servicio servicio) {
        return new ResponseEntity<>(servicioService.save(servicio), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un servicio",
            description = "Reasignarlo a otra persona lo devuelve a ASIGNADO. 404 si no existe; 409 si el "
                    + "servicio ya está COMPLETADO o CANCELADO o el personal está INACTIVO.")
    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(@PathVariable Integer id, @Valid @RequestBody Servicio servicio) {
        return ResponseEntity.ok(servicioService.update(id, servicio));
    }

    /** Ejemplo: {"estado": "ACEPTADO"}. COMPLETADO exige checklist obligatorio hecho y al menos una foto. */
    @Operation(summary = "Cambiar el estado de un servicio",
            description = "Ciclo: PENDIENTE → ASIGNADO → ACEPTADO o RECHAZADO → EN_PROCESO → COMPLETADO; "
                    + "CANCELADO desde cualquier estado no final; RECHAZADO puede volver a ASIGNADO. El "
                    + "personal solo puede marcar ACEPTADO, RECHAZADO, EN_PROCESO y COMPLETADO sobre sus "
                    + "propios servicios. COMPLETADO exige los ítems obligatorios del checklist hechos y al "
                    + "menos una foto de evidencia. Errores: 400 si el estado no existe; 403 si el personal "
                    + "intenta otro estado o un servicio ajeno; 409 si la transición no está permitida o "
                    + "falta checklist o foto.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Estado actualizado"),
            @ApiResponse(responseCode = "400", description = "Estado inexistente"),
            @ApiResponse(responseCode = "403", description = "El servicio no es suyo o el estado no está permitido para el personal"),
            @ApiResponse(responseCode = "409", description = "Transición no permitida, checklist incompleto o sin foto")
    })
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Servicio> cambiarEstado(@PathVariable Integer id, @Valid @RequestBody EstadoRequest request) {
        return ResponseEntity.ok(servicioService.cambiarEstado(id, request.estado()));
    }

    /** Ejemplo: [{"item": "Cambiar sabanas y toallas", "hecho": true}] */
    @Operation(summary = "Actualizar el checklist de un servicio",
            description = "El personal solo marca como hechos o no hechos los ítems existentes; ADMIN y "
                    + "PROPIETARIO reemplazan el checklist completo. Errores: 400 si la lista está vacía, un "
                    + "ítem no tiene descripción o el personal envía un ítem que no existe; 409 si el "
                    + "servicio ya está COMPLETADO o CANCELADO.")
    @PatchMapping("/{id}/checklist")
    public ResponseEntity<Servicio> actualizarChecklist(@PathVariable Integer id,
                                                        @RequestBody List<ChecklistItem> items) {
        return ResponseEntity.ok(servicioService.actualizarChecklist(id, items));
    }

    @Operation(summary = "Eliminar un servicio",
            description = "404 si no existe; 409 si tiene evidencias registradas (cancélelo en su lugar). Roles: "
                    + "ADMIN y PROPIETARIO.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        servicioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
