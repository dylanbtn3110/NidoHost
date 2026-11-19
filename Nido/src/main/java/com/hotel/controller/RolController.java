package com.hotel.controller;

import com.hotel.entity.Rol;
import com.hotel.service.RolService;
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
@RequestMapping("/api/v1/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @Operation(summary = "Listar roles",
            description = "Incluye las opciones de menú de cada rol. Solo ADMIN.")
    @GetMapping
    public ResponseEntity<List<Rol>> listar() {
        return ResponseEntity.ok(rolService.findAll());
    }

    @Operation(summary = "Obtener un rol",
            description = "404 si no existe. Solo ADMIN.")
    @GetMapping("/{id}")
    public ResponseEntity<Rol> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(rolService.findById(id));
    }

    @Operation(summary = "Registrar un rol",
            description = "Solo ADMIN. 400 si faltan campos obligatorios.")
    @PostMapping
    public ResponseEntity<Rol> crear(@Valid @RequestBody Rol rol) {
        return new ResponseEntity<>(rolService.save(rol), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un rol",
            description = "Solo ADMIN. 400 si faltan campos obligatorios; 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizar(@PathVariable Integer id, @Valid @RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.update(id, rol));
    }

    @Operation(summary = "Eliminar un rol",
            description = "Solo ADMIN. 404 si no existe; 409 si está en uso por otros registros.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Está en uso por otros registros")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        rolService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
