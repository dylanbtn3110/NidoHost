import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Grafico } from '../../../shared/grafico';
import { PALETA } from '../../../shared/paleta';
import { LEYENDA } from './opciones';

/** Dona: servicios con evidencia completa (checklist y fotos) frente a incompleta. */
@Component({
  selector: 'app-grafico-evidencia',
  imports: [Grafico],
  host: { class: 'tarjeta' },
  template: `
    <h2>Evidencia de los servicios</h2>
    @if (total() > 0) {
      <app-grafico tipo="doughnut" [datos]="datos()" [opciones]="opciones" [alto]="300" />
    } @else {
      <div class="vacio">Sin servicios en el periodo.</div>
    }`,
})
export class GraficoEvidencia {
  evidencia = input.required<{ completa: number; incompleta: number }>();

  protected total = computed(() => this.evidencia().completa + this.evidencia().incompleta);

  protected datos = computed<ChartData<'doughnut'>>(() => ({
    labels: ['Completa', 'Incompleta'],
    datasets: [{
      data: [this.evidencia().completa, this.evidencia().incompleta],
      backgroundColor: [PALETA.verde, PALETA.ambar],
      borderColor: '#fff', borderWidth: 2,
    }],
  }));

  protected opciones: ChartOptions<'doughnut'> = {
    cutout: '62%',
    plugins: {
      legend: LEYENDA,
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed} (${((Number(ctx.parsed) / this.total()) * 100).toFixed(0)} %)`,
        },
      },
    },
  };
}
