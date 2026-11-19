import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { UsuarioService } from '../../core/services/usuario.service';

/** Crear o editar un usuario (POST /usuarios o PUT /usuarios/{id}). Los roles se envian por su idrol. */
@Component({
  selector: 'app-usuario-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './usuario-dialogo.html',
  styles: `mat-form-field { margin-bottom: 8px; }`, // deja sitio al texto de ayuda y de error
})
export class UsuarioDialogo {
  private fb = inject(FormBuilder);
  private servicio = inject(UsuarioService);
  private aviso = inject(NotificacionService);
  private ref = inject<MatDialogRef<UsuarioDialogo, boolean>>(MatDialogRef);
  protected usuario = inject<Usuario | null>(MAT_DIALOG_DATA);

  protected editando = !!this.usuario;
  protected guardando = signal(false);
  protected verClave = signal(false);
  protected roles = signal<{ idrol: number; nombre: string }[]>([]);

  protected form = this.fb.nonNullable.group({
    nombres: [this.usuario?.nombres ?? '', Validators.required],
    apellidos: [this.usuario?.apellidos ?? '', Validators.required],
    dni: [this.usuario?.dni ?? '', Validators.pattern(/^\d{8}$/)],
    login: [{ value: this.usuario?.login ?? '', disabled: this.editando }, [Validators.required, Validators.maxLength(15)]],
    password: ['', this.editando ? [Validators.minLength(8)] : [Validators.required, Validators.minLength(8)]],
    correo: [this.usuario?.correo ?? '', Validators.email],
    roles: [(this.usuario?.roles ?? []).map(r => r.idrol!), Validators.required],
  });

  constructor() {
    // Solo se ofrecen los roles activos (mas los que el usuario ya tiene, para no quitarselos al editar).
    inject(CatalogoService).roles().subscribe(roles => this.roles.set(
      roles.filter(r => r.estado === 'ACTIVO' || this.usuario?.roles?.some(x => x.idrol === r.idrol))));
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cuerpo: Usuario = {
      ...this.usuario,
      nombres: v.nombres.trim(),
      apellidos: v.apellidos.trim(),
      dni: v.dni || undefined,
      login: v.login.trim(),
      correo: v.correo || undefined,
      roles: this.roles().filter(r => v.roles.includes(r.idrol)),
    };
    if (v.password) { cuerpo.password = v.password; }

    this.guardando.set(true);
    const peticion = this.editando
      ? this.servicio.actualizar(this.usuario!.idusuario!, cuerpo)
      : this.servicio.crear(cuerpo);
    peticion.subscribe({
      next: () => {
        this.aviso.exito(this.editando ? 'Usuario actualizado.' : 'Usuario creado.');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
