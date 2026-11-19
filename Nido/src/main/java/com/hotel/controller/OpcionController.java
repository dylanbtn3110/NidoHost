package com.hotel.controller;

import com.hotel.entity.Opcion;
import com.hotel.service.OpcionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "US02 · Usuarios y roles",
        description = "Administración de usuarios, roles y opciones de menú (US02). Rol: solo ADMIN. El "
                + "personal operativo se gestiona en US09 · Personal.")
@RestController
@RequestMapping("/api/v1/opciones")
public class OpcionController {

    private final OpcionService opcionService;

    public OpcionController(OpcionService opcionService) {
        this.opcionService = opcionService;
    }

    @Operation(summary = "Listar opciones de menú",
            description = "Devuelve todos los registros. Solo ADMIN.")
    @GetMapping
    public ResponseEntity<List<Opcion>> listar() {
        return ResponseEntity.ok(opcionService.findAll());
    }

    @Operation(summary = "Obtener una opción de menú",
            description = "404 si no existe. Solo ADMIN.")
    @GetMapping("/{id}")
    public ResponseEntity<Opcion> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(opcionService.findById(id));
    }

    @Operation(summary = "Registrar una opción de menú",
            description = "Solo ADMIN. 400 si faltan campos obligatorios.")
    @PostMapping
    public ResponseEntity<Opcion> crear(@Valid @RequestBody Opcion opcion) {
        return new ResponseEntity<>(opcionService.save(opcion), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar una opción de menú",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Opcion> actualizar(@PathVariable Integer id, @Valid @RequestBody Opcion opcion) {
        return ResponseEntity.ok(opcionService.update(id, opcion));
    }

    @Operation(summary = "Eliminar una opción de menú",
            description = "Solo ADMIN. 404 si no existe; 409 si está asignada a algún rol.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        opcionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
