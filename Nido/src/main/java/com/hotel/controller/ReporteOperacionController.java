package com.hotel.controller;

import com.hotel.dto.ReporteOperacionResponse;
import com.hotel.service.ReporteOperacionService;
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

/** Reporte de operacion (HU15). Los errores de parametros los responde GlobalExceptionHandler. */
@Tag(name = "US15 · Reporte de operación",
        description = "Indicadores operativos del periodo. Fechas en formato yyyy-MM-dd. Roles: ADMIN y "
                + "PROPIETARIO.")
@RestController
@RequestMapping("/api/v1/reportes")
public class ReporteOperacionController {

    private final ReporteOperacionService reporteOperacionService;

    public ReporteOperacionController(ReporteOperacionService reporteOperacionService) {
        this.reporteOperacionService = reporteOperacionService;
    }

    @Operation(summary = "Reporte de operación",
            description = "Servicios por estado, servicios con evidencia fotográfica completa e incompleta, "
                    + "servicios atrasados (fin vencido y sin finalizar) e incidencias por prioridad dentro "
                    + "del periodo. Un propietario solo ve sus alojamientos. 400 si falta una fecha o "
                    + "fechaInicio es posterior a fechaFin.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reporte de operación del periodo"),
            @ApiResponse(responseCode = "400", description = "Falta una fecha o el periodo es inválido")
    })
    @GetMapping("/operacion")
    public ResponseEntity<ReporteOperacionResponse> reporteOperacion(
            @Parameter(description = "Inicio del periodo (yyyy-MM-dd), inclusive", example = "2026-10-01")
            @RequestParam("fechaInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @Parameter(description = "Fin del periodo (yyyy-MM-dd), inclusive", example = "2026-10-31")
            @RequestParam("fechaFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        return ResponseEntity.ok(reporteOperacionService.obtenerReporte(fechaInicio, fechaFin));
    }
}
