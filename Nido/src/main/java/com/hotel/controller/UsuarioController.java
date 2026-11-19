package com.hotel.controller;

import com.hotel.dto.EstadoRequest;
import com.hotel.entity.Usuario;
import com.hotel.service.UsuarioService;
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

/**
 * Administracion de usuarios y sus roles (US02): solo ADMIN.
 * Gestion del personal operativo (US09): ADMIN y PROPIETARIO, en /personal.
 */
@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Operation(summary = "Listar usuarios",
            tags = "US02 · Usuarios y roles",
            description = "Incluye sus roles; la contraseña nunca se devuelve. Solo ADMIN.")
    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @Operation(summary = "Obtener un usuario",
            tags = "US02 · Usuarios y roles",
            description = "404 si no existe. Solo ADMIN.")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @Operation(summary = "Registrar un usuario",
            tags = "US02 · Usuarios y roles",
            description = "La contraseña (mínimo 8 caracteres) se guarda con BCrypt. Los roles se indican por "
                    + "idrol o por nombre (ADMIN, PROPIETARIO, PERSONAL); el estado por defecto es ACTIVO. "
                    + "Errores: 400 si la contraseña es corta o un rol no indica idrol ni nombre; 404 si el "
                    + "rol no existe; 409 si el login ya existe.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuario registrado"),
            @ApiResponse(responseCode = "400", description = "Contraseña de menos de 8 caracteres o datos inválidos"),
            @ApiResponse(responseCode = "409", description = "El login ya existe")
    })
    @PostMapping
    public ResponseEntity<Usuario> crear(@Valid @RequestBody Usuario usuario) {
        return new ResponseEntity<>(usuarioService.save(usuario), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un usuario",
            tags = "US02 · Usuarios y roles",
            description = "La contraseña y los roles solo cambian si se envían. 404 si no existe; 409 si el nuevo "
                    + "login ya existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Integer id, @Valid @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.update(id, usuario));
    }

    /** Activa o desactiva la cuenta. Un usuario INACTIVO no puede iniciar sesion. */
    @Operation(summary = "Activar o desactivar un usuario",
            tags = "US02 · Usuarios y roles",
            description = "Un usuario INACTIVO no puede iniciar sesión. 400 si el estado no es ACTIVO ni "
                    + "INACTIVO; 404 si no existe.")
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Usuario> cambiarEstado(@PathVariable Integer id, @Valid @RequestBody EstadoRequest request) {
        return ResponseEntity.ok(usuarioService.cambiarEstado(id, request.estado()));
    }

    @Operation(summary = "Eliminar un usuario",
            tags = "US02 · Usuarios y roles",
            description = "404 si no existe; 409 si tiene alojamientos, servicios u otros registros relacionados "
                    + "(en ese caso desactívelo).")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Eliminado"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "Tiene registros relacionados")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ------------------------------------------------------------------
    // Personal operativo (US09)
    // ------------------------------------------------------------------

    @Tag(name = "US09 · Personal",
            description = "Gestión del personal operativo, es decir, usuarios con rol PERSONAL (US09). Roles: "
                    + "ADMIN y PROPIETARIO.")
    @Operation(summary = "Listar el personal operativo",
            description = "Usuarios con rol PERSONAL, ordenados por nombre. Roles: ADMIN y PROPIETARIO.")
    @GetMapping("/personal")
    public ResponseEntity<List<Usuario>> listarPersonal(
            @Parameter(description = "Si es true devuelve solo el personal ACTIVO; por defecto false", example = "true")
            @RequestParam(defaultValue = "false") boolean soloActivos) {
        return ResponseEntity.ok(usuarioService.listarPersonal(soloActivos));
    }

    @Operation(summary = "Registrar personal operativo",
            tags = "US09 · Personal",
            description = "Siempre se crea con el rol PERSONAL, sin importar los roles enviados. Mismas reglas "
                    + "que un usuario: 400 si la contraseña tiene menos de 8 caracteres; 409 si el login ya "
                    + "existe. Roles: ADMIN y PROPIETARIO.")
    @PostMapping("/personal")
    public ResponseEntity<Usuario> registrarPersonal(@Valid @RequestBody Usuario usuario) {
        return new ResponseEntity<>(usuarioService.registrarPersonal(usuario), HttpStatus.CREATED);
    }

    @Operation(summary = "Activar o desactivar personal operativo",
            tags = "US09 · Personal",
            description = "Solo se asignan servicios a personal ACTIVO y un usuario INACTIVO no puede iniciar "
                    + "sesión. 400 si el usuario no es personal o el estado no es ACTIVO ni INACTIVO; 404 si "
                    + "no existe. Roles: ADMIN y PROPIETARIO.")
    @PatchMapping("/personal/{id}/estado")
    public ResponseEntity<Usuario> cambiarEstadoPersonal(@PathVariable Integer id,
                                                         @Valid @RequestBody EstadoRequest request) {
        return ResponseEntity.ok(usuarioService.cambiarEstadoPersonal(id, request.estado()));
    }
}
