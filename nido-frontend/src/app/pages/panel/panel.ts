import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { aFecha } from '../../core/fechas';
import { Incidencia, ReporteIngresos, ReporteOcupacion, ReporteOperacion } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { ReporteService } from '../../core/services/reporte.service';
import { GraficoIncidencias } from '../reportes/graficos/grafico-incidencias';
import { GraficoIngresos } from '../reportes/graficos/grafico-ingresos';
import { GraficoOcupacion } from '../reportes/graficos/grafico-ocupacion';
import { GraficoServicios } from '../reportes/graficos/grafico-servicios';

const DIAS_ANALIZADOS = 90;

interface DatosPanel {
  ingresos: ReporteIngresos;
  ocupacion: ReporteOcupacion;
  operacion: ReporteOperacion;
  abiertas: Incidencia[];
}

/** Panel inicial del administrador y del propietario: indicadores y graficos de los ultimos 90 dias (US08). */
@Component({
  selector: 'app-panel',
  imports: [DatePipe, DecimalPipe, CurrencyPipe, MatIconModule, MatProgressSpinnerModule,
    GraficoIngresos, GraficoOcupacion, GraficoServicios, GraficoIncidencias],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
})
export class PanelPage {
  private reportes = inject(ReporteService);
  private incidencias = inject(IncidenciaService);
  private auth = inject(AuthService);

  protected fin = new Date();
  protected inicio = new Date(this.fin.getFullYear(), this.fin.getMonth(), this.fin.getDate() - DIAS_ANALIZADOS);

  protected nombre = computed(() => (this.auth.sesion()?.nombres ?? '').split(' ')[0]);
  protected datos = signal<DatosPanel | null>(null);
  protected cargando = signal(true);

  protected serviciosDelPeriodo = computed(() =>
    Object.values(this.datos()?.operacion.serviciosPorEstado ?? {}).reduce((suma, n) => suma + n, 0));

  /** Sin ingresos, reservas, servicios ni incidencias en el rango no hay nada que graficar. */
  protected hayDatos = computed(() => {
    const d = this.datos();
    return !!d && (d.ingresos.totalIngresos > 0 || d.ingresos.totalGastos > 0 || this.serviciosDelPeriodo() > 0
      || d.ocupacion.ocupacionPromedio > 0 || Object.values(d.operacion.incidenciasPorPrioridad).some(n => n > 0));
  });

  constructor() {
    const desde = aFecha(this.inicio);
    const hasta = aFecha(this.fin);
    forkJoin({
      ingresos: this.reportes.ingresos(desde, hasta),
      ocupacion: this.reportes.ocupacion(desde, hasta),
      operacion: this.reportes.operacion(desde, hasta),
      abiertas: this.incidencias.buscar({ estado: 'ABIERTA' }),
    }).subscribe({
      next: datos => { this.datos.set(datos); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }
}
