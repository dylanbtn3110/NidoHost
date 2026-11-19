import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Alojamiento } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { AlojamientoDialogo } from './alojamiento-dialogo';

/** US03: listado y mantenimiento de alojamientos (el propietario solo ve los suyos). */
@Component({
  selector: 'app-alojamientos',
  imports: [CurrencyPipe, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatTooltipModule, MatProgressBarModule, EstadoChip],
  templateUrl: './alojamientos.html',
  styleUrl: './alojamientos.scss',
})
export class AlojamientosPage {
  private servicio = inject(AlojamientoService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);
  protected auth = inject(AuthService);

  protected alojamientos = signal<Alojamiento[]>([]);
  protected cargando = signal(true);
  protected texto = signal('');
  protected estado = signal('');

  protected columnas = computed(() => {
    const base = ['nombre', 'direccion', 'distrito', 'capacidad', 'precioBase', 'estado', 'acciones'];
    return this.auth.tieneRol('ADMIN') ? ['nombre', 'propietario', ...base.slice(1)] : base;
  });

  protected filtrados = computed(() => {
    const buscado = this.texto().trim().toLowerCase();
    return this.alojamientos().filter(a =>
      (!this.estado() || a.estado === this.estado()) &&
      (!buscado || `${a.nombre} ${a.direccion} ${a.ubigeo?.distrito ?? ''}`.toLowerCase().includes(buscado)));
  });

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.servicio.listar().subscribe({
      next: lista => { this.alojamientos.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected abrir(alojamiento?: Alojamiento): void {
    this.dialogo.open(AlojamientoDialogo, { data: alojamiento ?? null, width: '720px', maxWidth: '96vw' })
      .afterClosed().subscribe(guardado => { if (guardado) { this.cargar(); } });
  }

  protected async eliminar(a: Alojamiento): Promise<void> {
    if (!(await this.confirmar.pedir('Eliminar alojamiento', `¿Eliminar "${a.nombre}"? Esta acción no se puede deshacer.`))) { return; }
    this.servicio.eliminar(a.idAlojamiento!).subscribe(() => {
      this.aviso.exito('Alojamiento eliminado');
      this.cargar();
    });
  }
}
