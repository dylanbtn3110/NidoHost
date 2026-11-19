package com.hotel.controller;

import com.hotel.entity.Pais;
import com.hotel.service.PaisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Catálogos",
        description = "Tablas de apoyo: ubigeos, países, catálogos y sus datos. Consulta: cualquier usuario "
                + "autenticado. Crear, editar y eliminar: solo ADMIN.")
@RestController
@RequestMapping("/api/v1/paises")
public class PaisController {

    private final PaisService paisService;

    public PaisController(PaisService paisService) {
        this.paisService = paisService;
    }

    @Operation(summary = "Listar países",
            description = "Devuelve todos los registros. Cualquier usuario autenticado.")
    @GetMapping
    public ResponseEntity<List<Pais>> listar() {
        return ResponseEntity.ok(paisService.findAll());
    }

    @Operation(summary = "Obtener un país",
            description = "404 si no existe. Cualquier usuario autenticado.")
    @GetMapping("/{id}")
    public ResponseEntity<Pais> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(paisService.findById(id));
    }

    @Operation(summary = "Registrar un país",
            description = "Solo ADMIN. 400 si faltan campos obligatorios.")
    @PostMapping
    public ResponseEntity<Pais> crear(@Valid @RequestBody Pais pais) {
        return new ResponseEntity<>(paisService.save(pais), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un país",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Pais> actualizar(@PathVariable Integer id, @Valid @RequestBody Pais pais) {
        return ResponseEntity.ok(paisService.update(id, pais));
    }

    @Operation(summary = "Eliminar un país",
            description = "Solo ADMIN. 404 si no existe; 409 si está en uso por otros registros.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        paisService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
