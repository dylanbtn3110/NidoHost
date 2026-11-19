import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { aFecha, primerDiaDelMes, ultimoDiaDelMes } from '../../core/fechas';
import { Alojamiento, EventoCalendario } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { ReporteService } from '../../core/services/reporte.service';
import { EstadoChip } from '../../shared/estado-chip';

interface DiaCalendario { fecha: Date; clave: string; delMes: boolean; hoy: boolean; eventos: EventoCalendario[]; }

/** US08: calendario mensual de reservas y servicios, con vista de lista como alternativa accesible. */
@Component({
  selector: 'app-calendario',
  imports: [DatePipe, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatTableModule, MatTooltipModule, EstadoChip],
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss',
})
export class CalendarioPage {
  private reporteApi = inject(ReporteService);

  protected diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  protected columnas = ['tipo', 'alojamiento', 'inicio', 'fin', 'estado', 'detalle'];

  protected mes = signal(primerDiaDelMes());
  protected idAlojamiento = signal(0);
  protected alojamientos = signal<Alojamiento[]>([]);
  protected eventos = signal<EventoCalendario[]>([]);
  protected cargando = signal(true);

  /** Dias de la cuadricula: desde el lunes de la primera semana hasta el domingo de la ultima. */
  protected dias = computed<DiaCalendario[]>(() => {
    const primero = this.mes();
    const ultimo = ultimoDiaDelMes(primero);
    const desfaseInicio = (primero.getDay() + 6) % 7; // lunes = 0
    const desfaseFin = 6 - ((ultimo.getDay() + 6) % 7);
    const hoy = aFecha(new Date());
    const dias: DiaCalendario[] = [];
    for (let d = 1 - desfaseInicio; d <= ultimo.getDate() + desfaseFin; d++) {
      const fecha = new Date(primero.getFullYear(), primero.getMonth(), d);
      const clave = aFecha(fecha);
      dias.push({
        fecha, clave, hoy: clave === hoy, delMes: fecha.getMonth() === primero.getMonth(),
        eventos: this.eventos().filter(e => e.inicio.substring(0, 10) <= clave && clave <= e.fin.substring(0, 10)),
      });
    }
    return dias;
  });

  constructor() {
    inject(AlojamientoService).listar().subscribe(lista => this.alojamientos.set(lista));
    this.abrirEnMesConActividad();
  }

  /** Al entrar, si el mes actual no tiene eventos, abre el mes del evento mas reciente de los ultimos 6 meses. */
  private abrirEnMesConActividad(): void {
    const hoy = new Date();
    const mesActual = aFecha(hoy).substring(0, 7);
    const desde = new Date(hoy.getFullYear(), hoy.getMonth() - 6, 1);
    this.reporteApi.calendario(aFecha(desde), aFecha(ultimoDiaDelMes(hoy))).subscribe({
      next: lista => {
        const hayEnMesActual = lista.some(e => e.inicio.substring(0, 7) <= mesActual && e.fin.substring(0, 7) >= mesActual);
        if (!hayEnMesActual && lista.length) {
          const ultimo = lista.map(e => e.inicio).sort().at(-1)!;
          this.mes.set(new Date(+ultimo.substring(0, 4), +ultimo.substring(5, 7) - 1, 1));
        }
        this.cargar();
      },
      error: () => this.cargando.set(false),
    });
  }

  protected cargar(): void {
    this.cargando.set(true);
    const mes = this.mes();
    this.reporteApi.calendario(aFecha(mes), aFecha(ultimoDiaDelMes(mes)), this.idAlojamiento() || undefined).subscribe({
      next: lista => {
        this.eventos.set(lista);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  protected moverMes(cantidad: number): void {
    this.mes.update(m => new Date(m.getFullYear(), m.getMonth() + cantidad, 1));
    this.cargar();
  }

  protected irAHoy(): void {
    this.mes.set(primerDiaDelMes());
    this.cargar();
  }

  protected elegirAlojamiento(id: number): void {
    this.idAlojamiento.set(id);
    this.cargar();
  }

  /** Texto del chip: nombre corto del alojamiento (dos primeras palabras) y detalle. */
  protected texto(e: EventoCalendario): string {
    return `${e.alojamiento.split(' ').slice(0, 2).join(' ')} · ${e.detalle.replace('Huesped: ', '')}`;
  }

  protected tooltip(e: EventoCalendario): string {
    return `${e.tipo} · ${e.alojamiento} · ${e.detalle} · ${e.estado.replaceAll('_', ' ')}`;
  }
}
