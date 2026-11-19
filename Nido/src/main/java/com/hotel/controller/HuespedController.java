package com.hotel.controller;

import com.hotel.entity.Huesped;
import com.hotel.service.HuespedService;
import com.hotel.exception.RecursoNoEncontradoException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "US05 · Huéspedes",
        description = "Registro y administración de huéspedes sin duplicados (US05). Roles: ADMIN y "
                + "PROPIETARIO.")
@RestController
@RequestMapping("/api/v1/huespedes")
@CrossOrigin(origins = "*")
public class HuespedController {

    private final HuespedService huespedService;

    public HuespedController(HuespedService huespedService) {
        this.huespedService = huespedService;
    }

    @Operation(summary = "Listar huéspedes",
            description = "Devuelve todos los huéspedes registrados.")
    @GetMapping
    public ResponseEntity<List<Huesped>> listarTodos() {
        return new ResponseEntity<>(huespedService.findAll(), HttpStatus.OK);
    }

    @Operation(summary = "Obtener un huésped",
            description = "404 si no existe.")
    @GetMapping("/{id}")
    public ResponseEntity<Huesped> obtenerPorId(@PathVariable Integer id) {
        return huespedService.findById(id)
                .map(huesped -> new ResponseEntity<>(huesped, HttpStatus.OK))
                .orElseThrow(() -> new RecursoNoEncontradoException("Huesped", id));
    }

    @Operation(summary = "Registrar un huésped",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. Un huésped "
                    + "no se registra dos veces. Errores: 400 si falta idUsuario; 403 si idUsuario no es el "
                    + "del token; 409 si ya existe el correo o la misma combinación de nombres, apellidos y "
                    + "teléfono.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Huésped registrado"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario o hay datos inválidos"),
            @ApiResponse(responseCode = "403", description = "idUsuario no es el del token"),
            @ApiResponse(responseCode = "409", description = "Correo o nombres, apellidos y teléfono ya registrados")
    })
    @PostMapping
    public ResponseEntity<Huesped> crear(@Valid @RequestBody Huesped huesped) {
        return new ResponseEntity<>(huespedService.save(huesped), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un huésped",
            description = "Aplica las mismas reglas anti-duplicados que el registro (409). 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Huesped> actualizar(@PathVariable Integer id, @Valid @RequestBody Huesped huesped) {
        return new ResponseEntity<>(huespedService.update(id, huesped), HttpStatus.OK);
    }

    @Operation(summary = "Eliminar un huésped",
            description = "404 si no existe; 409 si tiene reservas u otros registros relacionados.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        huespedService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}