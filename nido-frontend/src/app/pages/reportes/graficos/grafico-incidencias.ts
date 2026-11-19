import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Grafico } from '../../../shared/grafico';
import { PALETA } from '../../../shared/paleta';
import { REJILLA, SIN_REJILLA } from './opciones';

const PRIORIDADES = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
const COLOR_PRIORIDAD = [PALETA.verde, PALETA.ambar, PALETA.rojo, PALETA.rojo];

/** Barras: cantidad de incidencias por prioridad, un color por prioridad. */
@Component({
  selector: 'app-grafico-incidencias',
  imports: [Grafico],
  host: { class: 'tarjeta' },
  template: `
    <h2>Incidencias por prioridad</h2>
    @if (hayDatos()) {
      <app-grafico tipo="bar" [datos]="datos()" [opciones]="opciones" [alto]="300" />
    } @else {
      <div class="vacio">Sin incidencias en el periodo.</div>
    }`,
})
export class GraficoIncidencias {
  /** Cantidad de incidencias por prioridad, tal como la entrega /reportes/operacion. */
  porPrioridad = input.required<Record<string, number>>();

  protected hayDatos = computed(() => PRIORIDADES.some(p => (this.porPrioridad()[p] ?? 0) > 0));

  protected datos = computed<ChartData<'bar'>>(() => ({
    labels: PRIORIDADES,
    datasets: [{
      label: 'Incidencias',
      data: PRIORIDADES.map(p => this.porPrioridad()[p] ?? 0),
      backgroundColor: COLOR_PRIORIDAD,
      borderRadius: 6, maxBarThickness: 56,
    }],
  }));

  protected opciones: ChartOptions<'bar'> = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: SIN_REJILLA },
      y: { beginAtZero: true, grid: REJILLA, border: { display: false }, ticks: { precision: 0 } },
    },
  };
}
