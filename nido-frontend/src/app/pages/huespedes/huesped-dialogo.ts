import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Huesped } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { HuespedService } from '../../core/services/huesped.service';
import { NotificacionService } from '../../core/services/notificacion.service';

/** Crear o editar un huesped (US05). */
@Component({
  selector: 'app-huesped-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './huesped-dialogo.html',
  styleUrl: './huesped-dialogo.scss',
})
export class HuespedDialogo {
  private fb = inject(FormBuilder);
  private servicio = inject(HuespedService);
  private auth = inject(AuthService);
  private aviso = inject(NotificacionService);
  private ref = inject(MatDialogRef<HuespedDialogo>);
  protected huesped = inject<Huesped | null>(MAT_DIALOG_DATA);

  protected guardando = signal(false);
  protected form = this.fb.nonNullable.group({
    nombres: [this.huesped?.nombres ?? '', Validators.required],
    apellidos: [this.huesped?.apellidos ?? '', Validators.required],
    correo: [this.huesped?.correo ?? '', Validators.email],
    telefono: [this.huesped?.telefono ?? ''],
    consentimiento: [this.huesped?.consentimiento ?? false, Validators.requiredTrue],
  });

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cuerpo: Huesped = {
      nombres: v.nombres.trim(),
      apellidos: v.apellidos.trim(),
      correo: v.correo.trim(),
      telefono: v.telefono.trim(),
      consentimiento: v.consentimiento,
    };
    this.guardando.set(true);
    const id = this.huesped?.idHuesped;
    const peticion = id
      ? this.servicio.actualizar(id, cuerpo)
      : this.servicio.crear({ ...cuerpo, idUsuario: this.auth.sesion()!.idusuario });
    peticion.subscribe({
      next: () => {
        this.aviso.exito(id ? 'Huésped actualizado' : 'Huésped registrado');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
