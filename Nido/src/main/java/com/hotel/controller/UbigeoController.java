package com.hotel.controller;

import com.hotel.entity.Ubigeo;
import com.hotel.service.UbigeoService;
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
@RequestMapping("/api/v1/ubigeos")
public class UbigeoController {

    private final UbigeoService ubigeoService;

    public UbigeoController(UbigeoService ubigeoService) {
        this.ubigeoService = ubigeoService;
    }

    @Operation(summary = "Listar ubigeos",
            description = "Devuelve departamento, provincia y distrito de cada ubigeo. Cualquier usuario "
                    + "autenticado.")
    @GetMapping
    public ResponseEntity<List<Ubigeo>> listar() {
        return ResponseEntity.ok(ubigeoService.findAll());
    }

    @Operation(summary = "Obtener un ubigeo",
            description = "404 si no existe. Cualquier usuario autenticado.")
    @GetMapping("/{id}")
    public ResponseEntity<Ubigeo> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(ubigeoService.findById(id));
    }

    @Operation(summary = "Registrar un ubigeo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios.")
    @PostMapping
    public ResponseEntity<Ubigeo> crear(@Valid @RequestBody Ubigeo ubigeo) {
        return new ResponseEntity<>(ubigeoService.save(ubigeo), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un ubigeo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Ubigeo> actualizar(@PathVariable Integer id, @Valid @RequestBody Ubigeo ubigeo) {
        return ResponseEntity.ok(ubigeoService.update(id, ubigeo));
    }

    @Operation(summary = "Eliminar un ubigeo",
            description = "Solo ADMIN. 404 si no existe; 409 si está en uso por otros registros.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        ubigeoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
