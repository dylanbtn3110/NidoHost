import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ReporteIngresos } from '../../../core/models';
import { Grafico } from '../../../shared/grafico';
import { PALETA } from '../../../shared/paleta';
import { LEYENDA, REJILLA, SIN_REJILLA, etiquetaCorta, soles } from './opciones';

/** Barras agrupadas: ingresos y gastos de cada alojamiento. */
@Component({
  selector: 'app-grafico-ingresos',
  imports: [Grafico],
  host: { class: 'tarjeta' },
  template: `
    <h2>Ingresos y gastos por alojamiento</h2>
    @if (hayDatos()) {
      <app-grafico tipo="bar" [datos]="datos()" [opciones]="opciones" [alto]="300" />
    } @else {
      <div class="vacio">Sin ingresos ni gastos en el periodo.</div>
    }`,
})
export class GraficoIngresos {
  reporte = input.required<ReporteIngresos>();

  protected hayDatos = computed(() => this.reporte().porAlojamiento.some(a => a.ingresos > 0 || a.gastos > 0));

  protected datos = computed<ChartData<'bar'>>(() => {
    const filas = this.reporte().porAlojamiento;
    return {
      labels: filas.map(a => a.alojamiento),
      datasets: [
        { label: 'Ingresos', data: filas.map(a => a.ingresos), backgroundColor: PALETA.petroleo, borderRadius: 6, maxBarThickness: 28 },
        { label: 'Gastos', data: filas.map(a => a.gastos), backgroundColor: PALETA.ambar, borderRadius: 6, maxBarThickness: 28 },
      ],
    };
  });

  protected opciones: ChartOptions<'bar'> = {
    plugins: {
      legend: LEYENDA,
      tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${soles(Number(ctx.parsed.y))}` } },
    },
    scales: {
      x: { grid: SIN_REJILLA, ticks: { callback: etiquetaCorta(14) } },
      y: { beginAtZero: true, grid: REJILLA, border: { display: false }, ticks: { callback: v => `S/ ${v}` } },
    },
  };
}
