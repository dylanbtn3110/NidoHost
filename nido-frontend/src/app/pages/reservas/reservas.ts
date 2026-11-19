import { DatePipe, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Alojamiento, Reserva } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ReservaService } from '../../core/services/reserva.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { ReservaDialogo } from './reserva-dialogo';

/** US06: gestion de reservas (listar, crear, editar, cancelar, eliminar). La validacion de solapamiento (US07) esta en el dialogo. */
@Component({
  selector: 'app-reservas',
  imports: [
    DatePipe, CurrencyPipe, FormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatProgressSpinnerModule, MatSelectModule, MatTableModule, MatTooltipModule, EstadoChip,
  ],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class ReservasPage {
  private reservaApi = inject(ReservaService);
  private alojamientoApi = inject(AlojamientoService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);

  protected columnas = ['id', 'alojamiento', 'huesped', 'entrada', 'salida', 'noches', 'canal', 'precio', 'estado', 'acciones'];
  protected estados = ['CONFIRMADA', 'PENDIENTE', 'CANCELADA', 'FINALIZADA'];

  protected reservas = signal<Reserva[]>([]);
  protected alojamientos = signal<Alojamiento[]>([]);
  protected cargando = signal(true);

  protected texto = signal('');
  protected filtroAlojamiento = signal(0);
  protected filtroEstado = signal('');

  protected lista = computed(() => {
    const texto = this.texto().trim().toLowerCase();
    return this.reservas().filter(r =>
      (!this.filtroAlojamiento() || r.alojamiento.idAlojamiento === this.filtroAlojamiento()) &&
      (!this.filtroEstado() || r.estado === this.filtroEstado()) &&
      (!texto || `${r.alojamiento.nombre} ${this.nombreHuesped(r)}`.toLowerCase().includes(texto)));
  });

  constructor() {
    this.alojamientoApi.listar().subscribe(lista => this.alojamientos.set(lista));
    this.cargar();
  }

  protected cargar(): void {
    this.reservaApi.listar().subscribe({
      next: lista => {
        this.reservas.set(lista);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  protected nombreHuesped(r: Reserva): string {
    return `${r.huesped.nombres ?? ''} ${r.huesped.apellidos ?? ''}`.trim();
  }

  /** Noches entre la fecha de entrada y la de salida (sin contar la hora). */
  protected noches(r: Reserva): number {
    const dia = 24 * 60 * 60 * 1000;
    return Math.round((new Date(r.salida.substring(0, 10)).getTime() - new Date(r.entrada.substring(0, 10)).getTime()) / dia);
  }

  protected abrir(reserva?: Reserva): void {
    this.dialogo.open(ReservaDialogo, { data: reserva ?? null, width: '640px', maxWidth: '95vw' })
      .afterClosed().subscribe(guardado => {
        if (guardado) { this.cargar(); }
      });
  }

  protected async cancelar(r: Reserva): Promise<void> {
    const ok = await this.confirmar.pedir('Cancelar reserva', `¿Cancelar la reserva #${r.idReserva} de ${this.nombreHuesped(r)}?`, 'Cancelar reserva');
    if (!ok) { return; }
    this.reservaApi.cancelar(r.idReserva!).subscribe(() => {
      this.aviso.exito('Reserva cancelada');
      this.cargar();
    });
  }

  protected async eliminar(r: Reserva): Promise<void> {
    const ok = await this.confirmar.pedir('Eliminar reserva', `¿Eliminar la reserva #${r.idReserva}? Esta accion no se puede deshacer.`);
    if (!ok) { return; }
    this.reservaApi.eliminar(r.idReserva!).subscribe(() => {
      this.aviso.exito('Reserva eliminada');
      this.cargar();
    });
  }
}
