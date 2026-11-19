import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { UsuarioDialogo } from './usuario-dialogo';

/** US02: administracion de usuarios y sus roles (solo ADMIN). */
@Component({
  selector: 'app-usuarios',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatTooltipModule, EstadoChip],
  templateUrl: './usuarios.html',
})
export class UsuariosPage {
  private servicio = inject(UsuarioService);
  private catalogo = inject(CatalogoService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);
  protected auth = inject(AuthService);

  protected usuarios = signal<Usuario[]>([]);
  protected roles = signal<string[]>([]);
  protected cargando = signal(true);

  protected texto = signal('');
  protected rol = signal('');
  protected estado = signal('');

  protected columnas = ['nombre', 'login', 'correo', 'roles', 'estado', 'acciones'];

  protected filtrados = computed(() => {
    const texto = this.texto().trim().toLowerCase();
    return this.usuarios().filter(u =>
      (!texto || `${u.nombres} ${u.apellidos} ${u.login} ${u.correo ?? ''}`.toLowerCase().includes(texto))
      && (!this.rol() || u.roles?.some(r => r.nombre === this.rol()))
      && (!this.estado() || u.estado === this.estado()));
  });

  constructor() {
    this.catalogo.roles().subscribe(roles => this.roles.set(roles.map(r => r.nombre)));
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.servicio.listar().subscribe({
      next: lista => { this.usuarios.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  /** Es la cuenta con la que se inició sesión: no se puede desactivar ni eliminar desde aquí. */
  protected esMiCuenta(u: Usuario): boolean {
    return u.idusuario === this.auth.sesion()?.idusuario;
  }

  protected abrir(usuario?: Usuario): void {
    this.dialogo.open(UsuarioDialogo, { data: usuario ?? null, width: '640px', maxWidth: '95vw' })
      .afterClosed().subscribe(guardado => { if (guardado) { this.cargar(); } });
  }

  protected async alternarEstado(u: Usuario): Promise<void> {
    const activar = u.estado !== 'ACTIVO';
    if (!activar && !(await this.confirmar.pedir(
      'Desactivar usuario', `${u.nombres} ${u.apellidos} ya no podrá iniciar sesión.`, 'Desactivar'))) {
      return;
    }
    this.servicio.cambiarEstado(u.idusuario!, activar ? 'ACTIVO' : 'INACTIVO').subscribe(() => {
      this.aviso.exito(activar ? 'Usuario activado.' : 'Usuario desactivado.');
      this.cargar();
    });
  }

  protected async eliminar(u: Usuario): Promise<void> {
    if (!(await this.confirmar.pedir('Eliminar usuario', `¿Eliminar a ${u.nombres} ${u.apellidos} (${u.login})? No se puede deshacer.`))) {
      return;
    }
    this.servicio.eliminar(u.idusuario!).subscribe(() => {
      this.aviso.exito('Usuario eliminado.');
      this.cargar();
    });
  }
}
