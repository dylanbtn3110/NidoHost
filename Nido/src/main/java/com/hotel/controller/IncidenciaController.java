package com.hotel.controller;

import com.hotel.dto.EstadoRequest;
import com.hotel.entity.Incidencia;
import com.hotel.service.IncidenciaService;
import com.hotel.exception.RecursoNoEncontradoException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Incidencias",
        description = "Registro y seguimiento de incidencias de los alojamientos. Consultar y reportar: "
                + "ADMIN, PROPIETARIO y PERSONAL. Editar, cambiar estado y eliminar: ADMIN y PROPIETARIO.")
@RestController
@RequestMapping("/api/v1/incidencias")
@CrossOrigin(origins = "*")
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    public IncidenciaController(IncidenciaService incidenciaService) {
        this.incidenciaService = incidenciaService;
    }

    /** Filtros opcionales: estado, prioridad e idAlojamiento. */
    @Operation(summary = "Listar incidencias",
            description = "Filtros opcionales por estado, prioridad y alojamiento. Un propietario recibe solo las "
                    + "de sus alojamientos.")
    @GetMapping
    public ResponseEntity<List<Incidencia>> listarTodas(
            @Parameter(description = "Estado: ABIERTA, EN_PROCESO, RESUELTA o CERRADA")
            @RequestParam(required = false) String estado,
            @Parameter(description = "Prioridad: BAJA, MEDIA, ALTA o CRITICA")
            @RequestParam(required = false) String prioridad,
            @Parameter(description = "Id del alojamiento") @RequestParam(required = false) Integer idAlojamiento) {
        return new ResponseEntity<>(incidenciaService.buscar(estado, prioridad, idAlojamiento), HttpStatus.OK);
    }

    @Operation(summary = "Obtener una incidencia",
            description = "404 si no existe; 403 si es de otro propietario.")
    @GetMapping("/{id}")
    public ResponseEntity<Incidencia> obtenerPorId(@PathVariable Integer id) {
        return incidenciaService.findById(id)
                .map(incidencia -> new ResponseEntity<>(incidencia, HttpStatus.OK))
                .orElseThrow(() -> new RecursoNoEncontradoException("Incidencia", id));
    }

    @Operation(summary = "Reportar una incidencia",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. Queda en "
                    + "estado ABIERTA. prioridad: BAJA, MEDIA, ALTA o CRITICA; la categoría se guarda en "
                    + "mayúsculas. Para obtener una sugerencia de categoría y prioridad use POST "
                    + "/ia/incidencias/sugerencia. Errores: 400 si falta idUsuario, la prioridad es inválida "
                    + "o la reserva no es del alojamiento; 403 si idUsuario no es el del token; 404 si el "
                    + "alojamiento, la reserva o el servicio no existen.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Incidencia registrada en estado ABIERTA"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario o datos inválidos"),
            @ApiResponse(responseCode = "403", description = "idUsuario no es el del token o el alojamiento es de otro propietario"),
            @ApiResponse(responseCode = "404", description = "El alojamiento, la reserva o el servicio no existen")
    })
    @PostMapping
    public ResponseEntity<Incidencia> crear(@Valid @RequestBody Incidencia incidencia) {
        return new ResponseEntity<>(incidenciaService.save(incidencia), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar una incidencia",
            description = "Valida de nuevo prioridad, estado y vínculos. Roles: ADMIN y PROPIETARIO. 400 si la "
                    + "prioridad o el estado son inválidos; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> actualizar(@PathVariable Integer id, @Valid @RequestBody Incidencia incidencia) {
        return new ResponseEntity<>(incidenciaService.update(id, incidencia), HttpStatus.OK);
    }

    @Operation(summary = "Cambiar el estado de una incidencia",
            description = "Estados: ABIERTA, EN_PROCESO, RESUELTA o CERRADA. 400 si el estado es inválido; 404 si "
                    + "no existe. Roles: ADMIN y PROPIETARIO.")
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Incidencia> cambiarEstado(@PathVariable Integer id, @Valid @RequestBody EstadoRequest request) {
        return ResponseEntity.ok(incidenciaService.cambiarEstado(id, request.estado()));
    }

    @Operation(summary = "Eliminar una incidencia",
            description = "404 si no existe; 403 si es de otro propietario.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        incidenciaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}