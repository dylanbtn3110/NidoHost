package com.hotel.controller;

import com.hotel.entity.Pago;
import com.hotel.service.PagoService;
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

@Tag(name = "Pagos",
        description = "Ingresos y gastos asociados a una reserva. Roles: ADMIN y PROPIETARIO; un propietario "
                + "solo opera pagos de reservas de sus alojamientos.")
@RestController
@RequestMapping("/api/v1/pagos")
@CrossOrigin(origins = "*")
public class PagoController {

    private final PagoService pagoService;

    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @Operation(summary = "Listar pagos",
            description = "Un propietario recibe solo los pagos de sus reservas.")
    @GetMapping
    public ResponseEntity<List<Pago>> listarTodos() {
        return new ResponseEntity<>(pagoService.findAll(), HttpStatus.OK);
    }

    @Operation(summary = "Obtener un pago",
            description = "404 si no existe; 403 si es de otro propietario.")
    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPorId(@PathVariable Integer id) {
        return pagoService.findById(id)
                .map(pago -> new ResponseEntity<>(pago, HttpStatus.OK))
                .orElseThrow(() -> new RecursoNoEncontradoException("Pago", id));
    }

    @Operation(summary = "Registrar un pago",
            description = "El campo idUsuario (quién registra) es obligatorio y debe ser el del token. El pago "
                    + "pertenece a una reserva existente. tipo: INGRESO (por defecto) o GASTO; estado: PAGADO "
                    + "(por defecto), PENDIENTE o ANULADO. Si no se envía moneda toma la de la reserva y si "
                    + "no se envía fecha, la actual. Solo los pagos PAGADO suman en los reportes. Errores: "
                    + "400 si falta idUsuario o el tipo o estado son inválidos; 403 si idUsuario no es el del "
                    + "token; 404 si la reserva no existe.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Pago registrado"),
            @ApiResponse(responseCode = "400", description = "Falta idUsuario, tipo o estado inválidos"),
            @ApiResponse(responseCode = "403", description = "idUsuario no es el del token o la reserva es de otro propietario"),
            @ApiResponse(responseCode = "404", description = "La reserva no existe")
    })
    @PostMapping
    public ResponseEntity<Pago> crear(@Valid @RequestBody Pago pago) {
        return new ResponseEntity<>(pagoService.save(pago), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar un pago",
            description = "Mismas validaciones de tipo, estado y reserva que el registro. 404 si no existe.")
    @PutMapping("/{id}")
    public ResponseEntity<Pago> actualizar(@PathVariable Integer id, @Valid @RequestBody Pago pago) {
        return new ResponseEntity<>(pagoService.update(id, pago), HttpStatus.OK);
    }

    @Operation(summary = "Eliminar un pago",
            description = "404 si no existe; 403 si es de otro propietario.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        pagoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}