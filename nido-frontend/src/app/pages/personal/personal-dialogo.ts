import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificacionService } from '../../core/services/notificacion.service';
import { UsuarioService } from '../../core/services/usuario.service';

/** Registrar un nuevo integrante del personal operativo (US09). */
@Component({
  selector: 'app-personal-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './personal-dialogo.html',
  styleUrl: './personal-dialogo.scss',
})
export class PersonalDialogo {
  private fb = inject(FormBuilder);
  private servicio = inject(UsuarioService);
  private aviso = inject(NotificacionService);
  private ref = inject(MatDialogRef<PersonalDialogo>);

  protected especialidades = ['LIMPIEZA', 'MANTENIMIENTO', 'INSPECCION'];
  protected guardando = signal(false);
  protected verClave = signal(false);

  protected form = this.fb.nonNullable.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    login: ['', [Validators.required, Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    correo: ['', Validators.email],
    especialidad: ['', Validators.required],
  });

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.guardando.set(true);
    this.servicio.registrarPersonal({ ...v, nombres: v.nombres.trim(), apellidos: v.apellidos.trim(), login: v.login.trim() }).subscribe({
      next: () => {
        this.aviso.exito('Personal registrado');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
