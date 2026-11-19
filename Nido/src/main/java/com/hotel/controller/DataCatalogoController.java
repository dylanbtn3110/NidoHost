package com.hotel.controller;

import com.hotel.entity.DataCatalogo;
import com.hotel.service.DataCatalogoService;
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
@RequestMapping("/api/v1/datacatalogos")
public class DataCatalogoController {

    private final DataCatalogoService dataCatalogoService;

    public DataCatalogoController(DataCatalogoService dataCatalogoService) {
        this.dataCatalogoService = dataCatalogoService;
    }

    @Operation(summary = "Listar datos de catálogo",
            description = "Devuelve todos los registros. Cualquier usuario autenticado.")
    @GetMapping
    public ResponseEntity<List<DataCatalogo>> listar() {
        return ResponseEntity.ok(dataCatalogoService.findAll());
    }

    @Operation(summary = "Obtener un dato de catálogo",
            description = "404 si no existe. Cualquier usuario autenticado.")
    @GetMapping("/{id}")
    public ResponseEntity<DataCatalogo> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(dataCatalogoService.findById(id));
    }

    @Operation(summary = "Registrar un dato de catálogo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios. Debe indicar el catálogo al que "
                    + "pertenece (catalogo.idCatalogo).")
    @PostMapping
    public ResponseEntity<DataCatalogo> crear(@Valid @RequestBody DataCatalogo dataCatalogo) {
        return new ResponseEntity<>(dataCatalogoService.save(dataCatalogo), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un dato de catálogo",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<DataCatalogo> actualizar(@PathVariable Integer id, @Valid @RequestBody DataCatalogo dataCatalogo) {
        return ResponseEntity.ok(dataCatalogoService.update(id, dataCatalogo));
    }

    @Operation(summary = "Eliminar un dato de catálogo",
            description = "Solo ADMIN. 404 si no existe; 409 si está en uso por otros registros.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        dataCatalogoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
