package com.hotel.controller;

import com.hotel.entity.Catalogo;
import com.hotel.service.CatalogoService;
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
@RequestMapping("/api/v1/catalogos")
public class CatalogoController {

    private final CatalogoService catalogoService;

    public CatalogoController(CatalogoService catalogoService) {
        this.catalogoService = catalogoService;
    }

    @Operation(summary = "Listar catálogos",
            description = "Devuelve todos los registros. Cualquier usuario autenticado.")
    @GetMapping
    public ResponseEntity<List<Catalogo>> listar() {
        return ResponseEntity.ok(catalogoService.findAll());
    }

    @Operation(summary = "Obtener un catálogo",
            description = "404 si no existe. Cualquier usuario autenticado.")
    @GetMapping("/{id}")
    public ResponseEntity<Catalogo> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(catalogoService.findById(id));
    }

    @Operation(summary = "Registrar un catálogo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios.")
    @PostMapping
    public ResponseEntity<Catalogo> crear(@Valid @RequestBody Catalogo catalogo) {
        return new ResponseEntity<>(catalogoService.save(catalogo), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un catálogo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Catalogo> actualizar(@PathVariable Integer id, @Valid @RequestBody Catalogo catalogo) {
        return ResponseEntity.ok(catalogoService.update(id, catalogo));
    }

    @Operation(summary = "Eliminar un catálogo",
            description = "Solo ADMIN. 404 si no existe; 409 si está en uso por otros registros.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        catalogoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
