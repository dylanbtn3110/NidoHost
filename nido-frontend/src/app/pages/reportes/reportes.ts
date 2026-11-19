import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { aFecha, primerDiaDelMes, ultimoDiaDelMes } from '../../core/fechas';
import { ReporteIngresos, ReporteOcupacion, ReporteOperacion } from '../../core/models';
import { ReporteService } from '../../core/services/reporte.service';
import { EstadoChip } from '../../shared/estado-chip';
import { GraficoEvidencia } from './graficos/grafico-evidencia';
import { GraficoIncidencias } from './graficos/grafico-incidencias';
import { GraficoIngresos } from './graficos/grafico-ingresos';
import { GraficoOcupacion } from './graficos/grafico-ocupacion';
import { GraficoServicios } from './graficos/grafico-servicios';

/** Una fila de la tabla de detalle: une los reportes de ingresos y de ocupacion de un alojamiento. */
interface FilaDetalle {
  idAlojamiento: number;
  alojamiento: string;
  ingresos: number;
  gastos: number;
  neto: number;
  nochesOcupadas: number;
  reservas: number;
  ocupacion: number;
}

interface DatosReporte {
  ingresos: ReporteIngresos;
  ocupacion: ReporteOcupacion;
  operacion: ReporteOperacion;
}

/** La fecha de inicio no puede ser posterior a la de fin (la API respondería 400). */
function periodoValido(grupo: { value: { fechaInicio: string; fechaFin: string } }): ValidationErrors | null {
  const { fechaInicio, fechaFin } = grupo.value;
  return fechaInicio && fechaFin && fechaInicio > fechaFin ? { periodoInvertido: true } : null;
}

/** US14 y US15: reportes de ingresos, ocupacion y operacion de un periodo, con exportacion a CSV e impresion. */
@Component({
  selector: 'app-reportes',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, DecimalPipe, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatChipsModule, MatTableModule, MatProgressSpinnerModule, EstadoChip,
    GraficoIngresos, GraficoOcupacion, GraficoServicios, GraficoIncidencias, GraficoEvidencia],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export class ReportesPage {
  private fb = inject(FormBuilder);
  private reportes = inject(ReporteService);

  private hoy = new Date();
  protected form = this.fb.nonNullable.group({
    fechaInicio: [aFecha(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate() - 90)), Validators.required],
    fechaFin: [aFecha(this.hoy), Validators.required],
  }, { validators: periodoValido });

  protected datos = signal<DatosReporte | null>(null);
  protected cargando = signal(false);
  /** Periodo que se muestra en pantalla (el de la ultima consulta, no el que se esta escribiendo). */
  protected periodo = signal({ fechaInicio: '', fechaFin: '' });

  protected columnas = ['alojamiento', 'ingresos', 'gastos', 'neto', 'nochesOcupadas', 'reservas', 'ocupacion'];

  protected detalle = computed<FilaDetalle[]>(() => {
    const d = this.datos();
    if (!d) { return []; }
    const filas = new Map<number, FilaDetalle>();
    const fila = (id: number, nombre: string) => {
      if (!filas.has(id)) {
        filas.set(id, { idAlojamiento: id, alojamiento: nombre, ingresos: 0, gastos: 0, neto: 0, nochesOcupadas: 0, reservas: 0, ocupacion: 0 });
      }
      return filas.get(id)!;
    };
    d.ingresos.porAlojamiento.forEach(a => Object.assign(fila(a.idAlojamiento, a.alojamiento), a));
    d.ocupacion.porAlojamiento.forEach(a => Object.assign(fila(a.idAlojamiento, a.alojamiento), a));
    return [...filas.values()].sort((a, b) => b.ingresos - a.ingresos || a.alojamiento.localeCompare(b.alojamiento));
  });

  protected totales = computed(() => {
    const filas = this.detalle();
    const suma = (campo: 'ingresos' | 'gastos' | 'neto' | 'nochesOcupadas' | 'reservas') =>
      filas.reduce((total, f) => total + f[campo], 0);
    return { ingresos: suma('ingresos'), gastos: suma('gastos'), neto: suma('neto'),
      nochesOcupadas: suma('nochesOcupadas'), reservas: suma('reservas') };
  });

  constructor() {
    this.consultar();
  }

  protected consultar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { fechaInicio, fechaFin } = this.form.getRawValue();
    this.cargando.set(true);
    forkJoin({
      ingresos: this.reportes.ingresos(fechaInicio, fechaFin),
      ocupacion: this.reportes.ocupacion(fechaInicio, fechaFin),
      operacion: this.reportes.operacion(fechaInicio, fechaFin),
    }).subscribe({
      next: datos => {
        this.datos.set(datos);
        this.periodo.set({ fechaInicio, fechaFin });
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  protected atajo(tipo: 'mes' | 'mesAnterior' | 'noventa'): void {
    const hoy = new Date();
    const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const [inicio, fin] =
      tipo === 'mes' ? [primerDiaDelMes(hoy), ultimoDiaDelMes(hoy)]
      : tipo === 'mesAnterior' ? [primerDiaDelMes(mesAnterior), ultimoDiaDelMes(mesAnterior)]
      : [new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 90), hoy];
    this.form.setValue({ fechaInicio: aFecha(inicio), fechaFin: aFecha(fin) });
    this.consultar();
  }

  /** Descarga la tabla de detalle como CSV (se arma en el navegador, sin llamar a la API). */
  protected exportarCsv(): void {
    const { fechaInicio, fechaFin } = this.periodo();
    const encabezado = ['Alojamiento', 'Ingresos', 'Gastos', 'Neto', 'Noches ocupadas', 'Reservas', 'Ocupación (%)'];
    const lineas = this.detalle().map(f =>
      [`"${f.alojamiento.replaceAll('"', '""')}"`, f.ingresos, f.gastos, f.neto, f.nochesOcupadas, f.reservas, f.ocupacion].join(','));
    // El BOM inicial hace que Excel lea bien las tildes.
    const contenido = '﻿' + [encabezado.join(','), ...lineas].join('\r\n');
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([contenido], { type: 'text/csv;charset=utf-8' }));
    enlace.download = `nido-reporte-${fechaInicio}-${fechaFin}.csv`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }

  protected imprimir(): void {
    window.print();
  }

  /** "2026-08-21" -> "21/08/2026" (sin pasar por Date, para no desplazar el dia por la zona horaria). */
  protected fechaCorta(iso: string): string {
    return iso.split('-').reverse().join('/');
  }
}
