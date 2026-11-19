import { toSignal } from '@angular/core/rxjs-interop';
import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { aFechaHoraApi } from '../../core/fechas';
import { Alojamiento, Reserva, Servicio, Usuario } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ReservaService } from '../../core/services/reserva.service';
import { ServicioService } from '../../core/services/servicio.service';
import { UsuarioService } from '../../core/services/usuario.service';

/** El fin, si se indica, debe ser posterior al inicio. */
function finDespuesDeInicio(grupo: AbstractControl): ValidationErrors | null {
  const inicio = grupo.get('inicio')?.value as string;
  const fin = grupo.get('fin')?.value as string;
  return inicio && fin && fin <= inicio ? { finAntesDeInicio: true } : null;
}

/** US10: asignar un servicio (limpieza, mantenimiento o inspeccion) a un integrante del personal activo. */
@Component({
  selector: 'app-servicio-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './servicio-dialogo.html',
})
export class ServicioDialogo {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private servicios = inject(ServicioService);
  private aviso = inject(NotificacionService);
  private ref = inject(MatDialogRef<ServicioDialogo, boolean>);

  protected tipos = ['LIMPIEZA', 'MANTENIMIENTO', 'INSPECCION'];
  protected alojamientos = signal<Alojamiento[]>([]);
  protected personal = signal<Usuario[]>([]);
  private reservas = signal<Reserva[]>([]);
  protected guardando = signal(false);

  protected form = this.fb.nonNullable.group({
    tipo: ['', Validators.required],
    idAlojamiento: [0, [Validators.required, Validators.min(1)]],
    idReserva: [0],
    idPersonal: [0, [Validators.required, Validators.min(1)]],
    inicio: ['', Validators.required],
    fin: [''],
  }, { validators: finDespuesDeInicio });

  private alojamientoElegido = toSignal(this.form.controls.idAlojamiento.valueChanges, { initialValue: 0 });
  /** Solo las reservas del alojamiento elegido. */
  protected reservasDelAlojamiento = computed(() =>
    this.reservas().filter(r => r.alojamiento.idAlojamiento === this.alojamientoElegido()));

  constructor() {
    inject(AlojamientoService).listar().subscribe(lista => this.alojamientos.set(lista));
    inject(ReservaService).listar().subscribe(lista => this.reservas.set(lista));
    inject(UsuarioService).personal(true).subscribe(lista => this.personal.set(lista));
    this.form.controls.idAlojamiento.valueChanges.subscribe(() => this.form.controls.idReserva.setValue(0));
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const servicio: Servicio = {
      idUsuario: this.auth.sesion()!.idusuario,
      tipo: v.tipo,
      inicio: aFechaHoraApi(v.inicio),
      fin: v.fin ? aFechaHoraApi(v.fin) : null,
      alojamiento: { idAlojamiento: v.idAlojamiento },
      reserva: v.idReserva ? { idReserva: v.idReserva } : null,
      personal: { idusuario: v.idPersonal },
    };
    this.guardando.set(true);
    this.servicios.crear(servicio).subscribe({
      next: () => {
        this.aviso.exito('Servicio asignado');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
