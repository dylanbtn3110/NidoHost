import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Servicio } from '../../core/models';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ServicioService } from '../../core/services/servicio.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { leerChecklist, progresoChecklist } from './checklist';
import { ServicioDetalleDialogo } from './servicio-detalle-dialogo';
import { ServicioDialogo } from './servicio-dialogo';

/** US10, US11 y US12 (vista del propietario): asignar servicios al personal, seguir el checklist y ver las fotos. */
@Component({
  selector: 'app-servicios',
  imports: [DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule,
    MatTooltipModule, MatProgressBarModule, MatProgressSpinnerModule, EstadoChip],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class ServiciosPage {
  private servicios = inject(ServicioService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);

  protected columnas = ['id', 'tipo', 'alojamiento', 'personal', 'inicio', 'fin', 'estado', 'checklist', 'acciones'];
  protected tipos = ['LIMPIEZA', 'MANTENIMIENTO', 'INSPECCION'];
  protected estados = ['PENDIENTE', 'ASIGNADO', 'ACEPTADO', 'RECHAZADO', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO'];

  protected lista = signal<Servicio[]>([]);
  protected cargando = signal(true);
  protected filtroTipo = signal('');
  protected filtroEstado = signal('');

  protected filtrados = computed(() => this.lista().filter(s =>
    (!this.filtroTipo() || s.tipo === this.filtroTipo()) && (!this.filtroEstado() || s.estado === this.filtroEstado())));

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.servicios.listar().subscribe({
      next: lista => { this.lista.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected progreso(servicio: Servicio) {
    return progresoChecklist(leerChecklist(servicio.checklist));
  }

  protected sePuedeCancelar(servicio: Servicio): boolean {
    return servicio.estado !== 'COMPLETADO' && servicio.estado !== 'CANCELADO';
  }

  protected nuevo(): void {
    this.dialogo.open(ServicioDialogo, { width: '640px', maxWidth: '95vw' }).afterClosed().subscribe(guardado => {
      if (guardado) { this.cargar(); }
    });
  }

  protected ver(servicio: Servicio): void {
    this.dialogo.open(ServicioDetalleDialogo, { data: servicio, width: '640px', maxWidth: '95vw' });
  }

  protected async cancelar(servicio: Servicio): Promise<void> {
    const si = await this.confirmar.pedir('Cancelar servicio',
      `¿Cancelar el servicio #${servicio.idServicio} de ${servicio.alojamiento.nombre}?`, 'Sí, cancelar');
    if (!si) { return; }
    this.servicios.cambiarEstado(servicio.idServicio!, 'CANCELADO').subscribe(() => {
      this.aviso.exito('Servicio cancelado');
      this.cargar();
    });
  }

  protected async eliminar(servicio: Servicio): Promise<void> {
    const si = await this.confirmar.pedir('Eliminar servicio',
      `¿Eliminar el servicio #${servicio.idServicio} de ${servicio.alojamiento.nombre}? No se puede deshacer.`);
    if (!si) { return; }
    this.servicios.eliminar(servicio.idServicio!).subscribe(() => {
      this.aviso.exito('Servicio eliminado');
      this.cargar();
    });
  }
}
