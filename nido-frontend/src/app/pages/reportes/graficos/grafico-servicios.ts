import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Grafico } from '../../../shared/grafico';
import { PALETA } from '../../../shared/paleta';
import { LEYENDA, sinGuiones } from './opciones';

const COLOR_ESTADO: Record<string, string> = {
  PENDIENTE: PALETA.ambar, ASIGNADO: PALETA.celeste, ACEPTADO: PALETA.gris, EN_PROCESO: PALETA.petroleo,
  COMPLETADO: PALETA.verde, RECHAZADO: PALETA.rojo, CANCELADO: PALETA.rojo,
};

/** Dona: cantidad de servicios en cada estado. */
@Component({
  selector: 'app-grafico-servicios',
  imports: [Grafico],
  host: { class: 'tarjeta' },
  template: `
    <h2>Servicios por estado</h2>
    @if (total() > 0) {
      <app-grafico tipo="doughnut" [datos]="datos()" [opciones]="opciones" [alto]="300" />
    } @else {
      <div class="vacio">Sin servicios en el periodo.</div>
    }`,
})
export class GraficoServicios {
  /** Cantidad de servicios por estado, tal como la entrega /reportes/operacion. */
  porEstado = input.required<Record<string, number>>();

  protected total = computed(() => Object.values(this.porEstado()).reduce((suma, n) => suma + n, 0));

  protected datos = computed<ChartData<'doughnut'>>(() => {
    const estados = Object.keys(this.porEstado());
    return {
      labels: estados.map(sinGuiones),
      datasets: [{
        data: estados.map(e => this.porEstado()[e]),
        backgroundColor: estados.map(e => COLOR_ESTADO[e] ?? PALETA.gris),
        borderColor: '#fff', borderWidth: 2,
      }],
    };
  });

  protected opciones: ChartOptions<'doughnut'> = {
    cutout: '62%',
    plugins: {
      legend: LEYENDA,
      tooltip: {
        callbacks: {
          label: ctx => {
            const porcentaje = (Number(ctx.parsed) / this.total()) * 100;
            return `${ctx.label}: ${ctx.parsed} (${porcentaje.toFixed(0)} %)`;
          },
        },
      },
    },
  };
}
