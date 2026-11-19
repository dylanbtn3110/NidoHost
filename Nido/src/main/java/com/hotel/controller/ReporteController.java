package com.hotel.controller;

import com.hotel.dto.CalendarioEvento;
import com.hotel.dto.ReporteIngresosResponse;
import com.hotel.dto.ReporteOcupacionResponse;
import com.hotel.service.ReporteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

/** Reportes de ingresos y ocupacion (US14) y calendario (US08). Fechas en formato yyyy-MM-dd. */
@Tag(name = "US14 · Reportes",
        description = "Reportes de ingresos y ocupación (US14) y calendario de reservas y servicios (US08). "
                + "Fechas en formato yyyy-MM-dd. Roles: ADMIN y PROPIETARIO; un propietario solo ve sus "
                + "alojamientos.")
@RestController
@RequestMapping("/api/v1/reportes")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @Operation(summary = "Reporte de ingresos y gastos",
            description = "Suma los pagos PAGADO del periodo en la moneda indicada: ingresos (tipo INGRESO), "
                    + "gastos (tipo GASTO) y neto, con el detalle por alojamiento. Los ingresos PENDIENTE se "
                    + "informan aparte en pendienteDeCobro. 400 si fechaInicio es posterior a fechaFin o el "
                    + "periodo supera un año.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reporte de ingresos del periodo"),
            @ApiResponse(responseCode = "400", description = "Periodo inválido o fechas con formato incorrecto")
    })
    @GetMapping("/ingresos")
    public ResponseEntity<ReporteIngresosResponse> ingresos(
            @Parameter(description = "Inicio del periodo (yyyy-MM-dd), inclusive", example = "2026-10-01")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @Parameter(description = "Fin del periodo (yyyy-MM-dd), inclusive", example = "2026-10-31")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin,
            @Parameter(description = "Código de moneda de los pagos", example = "PEN")
            @RequestParam(defaultValue = "PEN") String moneda) {
        return ResponseEntity.ok(reporteService.ingresos(fechaInicio, fechaFin, moneda));
    }

    @Operation(summary = "Reporte de ocupación",
            description = "Noches ocupadas sobre noches del periodo (ambas fechas inclusive) por alojamiento y "
                    + "ocupación promedio, en porcentaje. No incluye alojamientos INACTIVOS. 400 si "
                    + "fechaInicio es posterior a fechaFin o el periodo supera un año.")
    @GetMapping("/ocupacion")
    public ResponseEntity<ReporteOcupacionResponse> ocupacion(
            @Parameter(description = "Inicio del periodo (yyyy-MM-dd), inclusive", example = "2026-10-01")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @Parameter(description = "Fin del periodo (yyyy-MM-dd), inclusive", example = "2026-10-31")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        return ResponseEntity.ok(reporteService.ocupacion(fechaInicio, fechaFin));
    }

    @Operation(summary = "Calendario de reservas y servicios",
            description = "Lista las reservas y los servicios del periodo, ordenados por fecha de inicio. Con "
                    + "idAlojamiento solo trae los de ese alojamiento. 400 si fechaInicio es posterior a "
                    + "fechaFin o el periodo supera un año.")
    @GetMapping("/calendario")
    public ResponseEntity<List<CalendarioEvento>> calendario(
            @Parameter(description = "Inicio del periodo (yyyy-MM-dd), inclusive", example = "2026-10-01")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @Parameter(description = "Fin del periodo (yyyy-MM-dd), inclusive", example = "2026-10-31")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin,
            @Parameter(description = "Id del alojamiento para filtrar (opcional)")
            @RequestParam(required = false) Integer idAlojamiento) {
        return ResponseEntity.ok(reporteService.calendario(fechaInicio, fechaFin, idAlojamiento));
    }
}
