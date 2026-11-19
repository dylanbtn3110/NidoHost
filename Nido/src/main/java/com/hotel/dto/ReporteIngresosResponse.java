package com.hotel.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;

/** Ingresos y gastos del periodo (US14). Solo cuentan los pagos PAGADO; los PENDIENTE se muestran aparte. */
public record ReporteIngresosResponse(
        @Schema(description = "Inicio del periodo", example = "2026-10-01") LocalDate fechaInicio,
        @Schema(description = "Fin del periodo", example = "2026-10-31") LocalDate fechaFin,
        @Schema(description = "Moneda del reporte", example = "PEN") String moneda,
        @Schema(description = "Suma de los ingresos PAGADO", example = "4500.0") double totalIngresos,
        @Schema(description = "Suma de los gastos PAGADO", example = "600.0") double totalGastos,
        @Schema(description = "Ingresos menos gastos", example = "3900.0") double neto,
        @Schema(description = "Ingresos PENDIENTE aún no cobrados (no suman en el total)", example = "360.0")
        double pendienteDeCobro,
        @Schema(description = "Detalle por alojamiento, del mayor al menor neto")
        List<PorAlojamiento> porAlojamiento) {

    public record PorAlojamiento(
            @Schema(description = "Id del alojamiento", example = "1") Integer idAlojamiento,
            @Schema(description = "Nombre del alojamiento", example = "Departamento Miraflores Vista Mar")
            String alojamiento,
            @Schema(description = "Ingresos PAGADO del alojamiento", example = "2200.0") double ingresos,
            @Schema(description = "Gastos PAGADO del alojamiento", example = "300.0") double gastos,
            @Schema(description = "Ingresos menos gastos", example = "1900.0") double neto) {
    }
}
