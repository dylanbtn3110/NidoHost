package com.hotel.controller;

import com.hotel.dto.UbicacionRequest;
import com.hotel.entity.Alojamiento;
import com.hotel.exception.RecursoNoEncontradoException;
import com.hotel.service.AlojamientoService;
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

@Tag(name = "US03 · Alojamientos",
        description = "Registro y administración de alojamientos, y confirmación de su ubicación (US03, "
                + "US04). Roles: ADMIN y PROPIETARIO; un propietario solo ve y opera los suyos (403 si es "
                + "de otro).")
@RestController
@RequestMapping("/api/v1/alojamientos")
@CrossOrigin(origins = "*")
public class AlojamientoController {

    private final AlojamientoService alojamientoService;

    public AlojamientoController(AlojamientoService alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    @Operation(summary = "Listar alojamientos",
            description = "Un propietario recibe solo sus alojamientos; el administrador, todos.")
    @GetMapping
    public ResponseEntity<List<Alojamiento>> listarTodos() {
        return new ResponseEntity<>(alojamientoService.findAll(), HttpStatus.OK);
    }

    @Operation(summary = "Obtener un alojamiento",
            description = "404 si no existe; 403 si pertenece a otro propietario.")
    @GetMapping("/{id}")
    public ResponseEntity<Alojamiento> obtenerPorId(@PathVariable Integer id) {
        return alojamientoService.findById(id)
                .map(alojamiento -> new ResponseEntity<>(alojamiento, HttpStatus.OK))
                .orElseThrow(() -> new RecursoNoEncontradoException("Alojamiento", id));
    }

    @Operation(summary = "Registrar un alojamiento",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. Un "
                    + "propietario lo registra a su nombre; el administrador debe indicar en "
                    + "'propietario.idusuario' a un usuario con rol PROPIETARIO. Si no se envía estado queda "
                    + "DISPONIBLE. Errores: 400 si falta idUsuario o el propietario no es válido; 403 si "
                    + "idUsuario no es el del token; 409 si la dirección ya está registrada o el propietario "
                    + "ya tiene un alojamiento con ese nombre.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Alojamiento registrado"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario, datos inválidos o propietario sin rol PROPIETARIO"),
            @ApiResponse(responseCode = "403", description = "idUsuario no es el del token"),
            @ApiResponse(responseCode = "409", description = "Dirección o nombre duplicado")
    })
    @PostMapping
    public ResponseEntity<Alojamiento> crear(@Valid @RequestBody Alojamiento alojamiento) {
        return new ResponseEntity<>(alojamientoService.save(alojamiento), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un alojamiento",
            description = "Un propietario no puede transferir su alojamiento; solo el administrador puede cambiar "
                    + "el propietario. Errores: 404 si no existe; 403 si es de otro propietario; 409 si la "
                    + "nueva dirección o nombre ya están registrados.")
    @PutMapping("/{id}")
    public ResponseEntity<Alojamiento> actualizar(@PathVariable Integer id, @Valid @RequestBody Alojamiento alojamiento) {
        return new ResponseEntity<>(alojamientoService.update(id, alojamiento), HttpStatus.OK);
    }

    /** Confirma la latitud y longitud del alojamiento (US04). Ejemplo: {"latitud": -12.1322, "longitud": -77.0302} */
    @Operation(summary = "Confirmar la ubicación de un alojamiento",
            description = "Guarda la latitud (-90 a 90) y la longitud (-180 a 180) confirmadas por el "
                    + "propietario, normalmente sugeridas por GET /geocodificacion. 400 si faltan o están "
                    + "fuera de rango; 404 si no existe; 403 si es de otro propietario.")
    @PatchMapping("/{id}/ubicacion")
    public ResponseEntity<Alojamiento> confirmarUbicacion(@PathVariable Integer id,
                                                         @Valid @RequestBody UbicacionRequest request) {
        return ResponseEntity.ok(alojamientoService.confirmarUbicacion(id, request.latitud(), request.longitud()));
    }

    @Operation(summary = "Eliminar un alojamiento",
            description = "404 si no existe; 403 si es de otro propietario; 409 si tiene reservas, servicios u "
                    + "otros registros relacionados.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Tiene registros relacionados")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        alojamientoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Buscar alojamientos por estado",
            description = "Un propietario recibe solo los suyos. Responde 204 sin contenido si no hay "
                    + "coincidencias.")
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Alojamiento>> buscarPorEstado(
            @Parameter(description = "Estado del alojamiento, por ejemplo DISPONIBLE o INACTIVO", example = "DISPONIBLE")
            @PathVariable String estado) {
        List<Alojamiento> lista = alojamientoService.buscarPorEstado(estado);
        if(lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }
}
