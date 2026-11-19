import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ReporteOcupacion } from '../../../core/models';
import { Grafico } from '../../../shared/grafico';
import { PALETA } from '../../../shared/paleta';
import { REJILLA, SIN_REJILLA, etiquetaCorta } from './opciones';

/** Barras horizontales: porcentaje de ocupacion de cada alojamiento (0 a 100 %). */
@Component({
  selector: 'app-grafico-ocupacion',
  imports: [Grafico],
  host: { class: 'tarjeta' },
  template: `
    <h2>Ocupación por alojamiento</h2>
    @if (hayDatos()) {
      <app-grafico tipo="bar" [datos]="datos()" [opciones]="opciones" [alto]="alto()" />
    } @else {
      <div class="vacio">Sin reservas en el periodo.</div>
    }`,
})
export class GraficoOcupacion {
  reporte = input.required<ReporteOcupacion>();

  protected hayDatos = computed(() => this.reporte().porAlojamiento.some(a => a.nochesOcupadas > 0));
  /** Una barra por alojamiento: el grafico crece con la cantidad. */
  protected alto = computed(() => Math.max(300, this.reporte().porAlojamiento.length * 28 + 50));

  protected datos = computed<ChartData<'bar'>>(() => {
    const filas = this.reporte().porAlojamiento;
    return {
      labels: filas.map(a => a.alojamiento),
      datasets: [{ label: 'Ocupación', data: filas.map(a => a.ocupacion), backgroundColor: PALETA.petroleo, borderRadius: 6, maxBarThickness: 18 }],
    };
  });

  protected opciones: ChartOptions<'bar'> = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: ctx => `Ocupación: ${Number(ctx.parsed.x).toFixed(1)} %` } },
    },
    scales: {
      x: { min: 0, max: 100, grid: REJILLA, border: { display: false }, ticks: { callback: v => `${v} %` } },
      y: { grid: SIN_REJILLA, ticks: { callback: etiquetaCorta(18) } },
    },
  };
}
