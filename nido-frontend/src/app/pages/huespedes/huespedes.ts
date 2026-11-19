import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Huesped } from '../../core/models';
import { HuespedService } from '../../core/services/huesped.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { HuespedDialogo } from './huesped-dialogo';

/** US05: registro de huespedes con su consentimiento de uso de datos. */
@Component({
  selector: 'app-huespedes',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule, MatProgressBarModule],
  templateUrl: './huespedes.html',
  styleUrl: './huespedes.scss',
})
export class HuespedesPage {
  private servicio = inject(HuespedService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);

  protected huespedes = signal<Huesped[]>([]);
  protected cargando = signal(true);
  protected texto = signal('');
  protected columnas = ['nombre', 'correo', 'telefono', 'consentimiento', 'acciones'];

  protected filtrados = computed(() => {
    const buscado = this.texto().trim().toLowerCase();
    return this.huespedes().filter(h =>
      !buscado || `${h.nombres} ${h.apellidos} ${h.correo ?? ''} ${h.telefono ?? ''}`.toLowerCase().includes(buscado));
  });

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.servicio.listar().subscribe({
      next: lista => { this.huespedes.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected abrir(huesped?: Huesped): void {
    this.dialogo.open(HuespedDialogo, { data: huesped ?? null, width: '640px', maxWidth: '96vw' })
      .afterClosed().subscribe(guardado => { if (guardado) { this.cargar(); } });
  }

  protected async eliminar(h: Huesped): Promise<void> {
    if (!(await this.confirmar.pedir('Eliminar huésped', `¿Eliminar a ${h.nombres} ${h.apellidos}? Esta acción no se puede deshacer.`))) { return; }
    this.servicio.eliminar(h.idHuesped!).subscribe(() => {
      this.aviso.exito('Huésped eliminado');
      this.cargar();
    });
  }
}
