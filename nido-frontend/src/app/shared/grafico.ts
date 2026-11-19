import { Component, ElementRef, OnDestroy, effect, input, viewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);
Chart.defaults.font.family = 'Inter, sans-serif';
Chart.defaults.color = '#5B6B73';

/** Grafico de Chart.js: se dibuja de nuevo cuando cambian los datos. */
@Component({
  selector: 'app-grafico',
  template: `<div class="lienzo" [style.height.px]="alto()"><canvas #lienzo></canvas></div>`,
  styles: `.lienzo { position: relative; width: 100%; }`,
})
export class Grafico implements OnDestroy {
  tipo = input.required<ChartType>();
  datos = input.required<ChartData>();
  opciones = input<ChartOptions>({});
  alto = input(280);

  private lienzo = viewChild.required<ElementRef<HTMLCanvasElement>>('lienzo');
  private grafico?: Chart;

  constructor() {
    effect(() => {
      const tipo = this.tipo();
      const datos = JSON.parse(JSON.stringify(this.datos()));
      const opciones = this.opciones();
      this.grafico?.destroy();
      this.grafico = new Chart(this.lienzo().nativeElement, {
        type: tipo,
        data: datos,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...opciones,
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } }, ...opciones.plugins },
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.grafico?.destroy();
  }
}
