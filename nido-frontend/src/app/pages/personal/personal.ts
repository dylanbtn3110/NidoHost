import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../../core/models';
import { NotificacionService } from '../../core/services/notificacion.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { PersonalDialogo } from './personal-dialogo';

/** US09: registro y administracion del personal operativo (limpieza, mantenimiento, inspeccion). */
@Component({
  selector: 'app-personal',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule,
    MatProgressBarModule, MatSlideToggleModule, EstadoChip],
  templateUrl: './personal.html',
  styleUrl: './personal.scss',
})
export class PersonalPage {
  private servicio = inject(UsuarioService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);

  protected personal = signal<Usuario[]>([]);
  protected cargando = signal(true);
  protected texto = signal('');
  protected soloActivos = signal(true);
  protected columnas = ['nombre', 'login', 'especialidad', 'correo', 'estado', 'acciones'];

  protected filtrados = computed(() => {
    const buscado = this.texto().trim().toLowerCase();
    return this.personal().filter(p =>
      (!this.soloActivos() || p.estado === 'ACTIVO') &&
      (!buscado || `${p.nombres} ${p.apellidos} ${p.login} ${p.especialidad ?? ''}`.toLowerCase().includes(buscado)));
  });

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.servicio.personal().subscribe({
      next: lista => { this.personal.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected registrar(): void {
    this.dialogo.open(PersonalDialogo, { width: '640px', maxWidth: '96vw' })
      .afterClosed().subscribe(guardado => { if (guardado) { this.cargar(); } });
  }

  protected async cambiarEstado(p: Usuario): Promise<void> {
    const nuevo = p.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    if (nuevo === 'INACTIVO' &&
      !(await this.confirmar.pedir('Desactivar personal', `¿Desactivar a ${p.nombres} ${p.apellidos}? Ya no podrá recibir servicios.`, 'Desactivar'))) { return; }
    this.servicio.cambiarEstadoPersonal(p.idusuario!, nuevo).subscribe(() => {
      this.aviso.exito(nuevo === 'ACTIVO' ? 'Personal activado' : 'Personal desactivado');
      this.cargar();
    });
  }
}
