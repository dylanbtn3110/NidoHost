package com.hotel.controller;

import com.hotel.entity.Auditoria;
import com.hotel.repository.AuditoriaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Consulta de la bitacora de acciones criticas (US22). Solo ADMIN. */
@Tag(name = "US22 · Auditoría",
        description = "Bitácora de acciones críticas del sistema. Rol: solo ADMIN.")
@RestController
@RequestMapping("/api/v1/auditorias")
public class AuditoriaController {

    private final AuditoriaRepository auditoriaRepository;

    public AuditoriaController(AuditoriaRepository auditoriaRepository) {
        this.auditoriaRepository = auditoriaRepository;
    }

    /** Filtros opcionales: entidad (ej. reservas) y usuario (login). */
    @Operation(summary = "Consultar la bitácora de auditoría",
            description = "Cada creación, modificación o eliminación exitosa (POST, PUT, PATCH y DELETE con "
                    + "respuesta 2xx) queda registrada con usuario, fecha, entidad, operación (CREAR, "
                    + "ACTUALIZAR o ELIMINAR) e id del registro. No se registran el inicio de sesión ni las "
                    + "sugerencias de IA. Resultados del más reciente al más antiguo. 403 si no es ADMIN.")
    @GetMapping
    public ResponseEntity<List<Auditoria>> listar(
            @Parameter(description = "Entidad afectada (primer tramo de la URL), por ejemplo reservas, alojamientos o servicios")
            @RequestParam(required = false) String entidad,
            @Parameter(description = "Login del usuario que ejecutó la acción, por ejemplo admin")
            @RequestParam(required = false) String usuario) {
        return ResponseEntity.ok(auditoriaRepository.buscar(entidad, usuario));
    }
}
