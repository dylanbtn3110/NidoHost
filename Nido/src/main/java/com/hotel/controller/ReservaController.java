package com.hotel.controller;

import com.hotel.dto.DisponibilidadResponse;
import com.hotel.entity.Reserva;
import com.hotel.exception.RecursoNoEncontradoException;
import com.hotel.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "US07 · Reservas",
        description = "Reservas de alojamientos, disponibilidad por fechas y cancelación (US06, US07). Roles: "
                + "ADMIN y PROPIETARIO; un propietario solo opera reservas de sus alojamientos.")
@RestController
@RequestMapping("/api/v1/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @Operation(summary = "Listar reservas",
            description = "Un propietario recibe solo las reservas de sus alojamientos.")
    @GetMapping
    public ResponseEntity<List<Reserva>> listarTodas() {
        return new ResponseEntity<>(reservaService.findAll(), HttpStatus.OK);
    }

    @Operation(summary = "Obtener una reserva",
            description = "404 si no existe; 403 si su alojamiento es de otro propietario.")
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerPorId(@PathVariable Integer id) {
        return reservaService.findById(id)
                .map(reserva -> new ResponseEntity<>(reserva, HttpStatus.OK))
                .orElseThrow(() -> new RecursoNoEncontradoException("Reserva", id));
    }

    @Operation(summary = "Listar las reservas de un alojamiento",
            description = "Ordenadas por fecha de entrada. 404 si el alojamiento no existe; 403 si es de otro "
                    + "propietario.")
    @GetMapping("/alojamiento/{idAlojamiento}")
    public ResponseEntity<List<Reserva>> listarPorAlojamiento(@PathVariable Integer idAlojamiento) {
        return ResponseEntity.ok(reservaService.listarPorAlojamiento(idAlojamiento));
    }

    /** Ejemplo: /api/v1/reservas/disponibilidad?idAlojamiento=1&entrada=2026-10-11T14:00:00&salida=2026-10-12T11:00:00 */
    @Operation(summary = "Consultar la disponibilidad de un alojamiento",
            description = "Indica si el alojamiento está libre entre la entrada y la salida y lista las reservas "
                    + "que se cruzan (las CANCELADAS no cuentan). Dos reservas se cruzan si una entra antes "
                    + "de que la otra salga. 400 si la salida no es posterior a la entrada; 404 si el "
                    + "alojamiento no existe.")
    @GetMapping("/disponibilidad")
    public ResponseEntity<DisponibilidadResponse> disponibilidad(
            @Parameter(description = "Id del alojamiento a consultar", example = "1")
            @RequestParam Integer idAlojamiento,
            @Parameter(description = "Fecha y hora de entrada (yyyy-MM-ddTHH:mm:ss)", example = "2026-10-11T14:00:00")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime entrada,
            @Parameter(description = "Fecha y hora de salida (yyyy-MM-ddTHH:mm:ss), posterior a la entrada", example = "2026-10-12T11:00:00")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime salida) {
        return ResponseEntity.ok(reservaService.consultarDisponibilidad(idAlojamiento, entrada, salida));
    }

    @Operation(summary = "Registrar una reserva",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. Estado por "
                    + "defecto PENDIENTE (PENDIENTE, CONFIRMADA, EN_CURSO, FINALIZADA o CANCELADA). Si no se "
                    + "envía precio se calcula como noches × precio base del alojamiento; la moneda por "
                    + "defecto es PEN. Errores: 400 si falta idUsuario, la salida no es posterior a la "
                    + "entrada o el estado es inválido; 403 si idUsuario no es el del token; 404 si el "
                    + "alojamiento o el huésped no existen; 409 si el alojamiento está INACTIVO o ya tiene "
                    + "una reserva activa que se cruza.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Reserva registrada"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario, fechas o estado inválidos"),
            @ApiResponse(responseCode = "404", description = "El alojamiento o el huésped no existen"),
            @ApiResponse(responseCode = "409", description = "Alojamiento INACTIVO o fechas cruzadas con otra reserva")
    })
    @PostMapping
    public ResponseEntity<Reserva> crear(@Valid @RequestBody Reserva reserva) {
        return new ResponseEntity<>(reservaService.save(reserva), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar una reserva",
            description = "Vuelve a validar las fechas y los cruces (la propia reserva se excluye). Errores: 400, "
                    + "404 y 409 como en el registro.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reserva actualizada"),
            @ApiResponse(responseCode = "400", description = "Fechas o estado inválidos"),
            @ApiResponse(responseCode = "409", description = "Fechas cruzadas con otra reserva")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizar(@PathVariable Integer id, @Valid @RequestBody Reserva reserva) {
        return new ResponseEntity<>(reservaService.update(id, reserva), HttpStatus.OK);
    }

    @Operation(summary = "Cancelar una reserva",
            description = "Cambia el estado a CANCELADA y libera las fechas. 404 si no existe; 409 si la reserva "
                    + "ya está FINALIZADA.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reserva cancelada"),
            @ApiResponse(responseCode = "404", description = "No existe"),
            @ApiResponse(responseCode = "409", description = "La reserva ya está FINALIZADA")
    })
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Reserva> cancelar(@PathVariable Integer id) {
        return ResponseEntity.ok(reservaService.cancelar(id));
    }

    @Operation(summary = "Eliminar una reserva",
            description = "404 si no existe; 409 si tiene pagos u otros registros relacionados.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        reservaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
