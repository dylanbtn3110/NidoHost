import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { aCampoFechaHora, aFechaHoraApi, ahoraComoCampo } from '../../core/fechas';
import { Pago, Reserva } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { PagoService } from '../../core/services/pago.service';
import { ReservaService } from '../../core/services/reserva.service';

/** Crear o editar un pago (ingreso o gasto) de una reserva. */
@Component({
  selector: 'app-pago-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './pago-dialogo.html',
})
export class PagoDialogo {
  private fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<PagoDialogo, boolean>);
  private pagoApi = inject(PagoService);
  private auth = inject(AuthService);
  private aviso = inject(NotificacionService);
  protected pago = inject<Pago | null>(MAT_DIALOG_DATA);

  protected tipos = ['INGRESO', 'GASTO'];
  protected estados = ['PAGADO', 'PENDIENTE', 'ANULADO'];

  protected reservas = signal<Reserva[]>([]);
  protected guardando = signal(false);

  protected form = this.fb.nonNullable.group({
    tipo: [this.pago?.tipo ?? 'INGRESO', Validators.required],
    importe: [this.pago?.importe ?? 0, [Validators.required, Validators.min(0.01)]],
    moneda: [this.pago?.moneda ?? 'PEN', [Validators.required, Validators.maxLength(3)]],
    fecha: [this.pago ? aCampoFechaHora(this.pago.fecha) : ahoraComoCampo(), Validators.required],
    estado: [this.pago?.estado ?? 'PAGADO', Validators.required],
    idReserva: [this.pago?.reserva.idReserva ?? 0, Validators.min(1)],
  });

  constructor() {
    inject(ReservaService).listar().subscribe(lista => this.reservas.set(lista));
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cuerpo: Pago = {
      tipo: v.tipo,
      importe: v.importe,
      moneda: v.moneda,
      fecha: aFechaHoraApi(v.fecha),
      estado: v.estado,
      reserva: { idReserva: v.idReserva },
    };
    this.guardando.set(true);
    const peticion = this.pago
      ? this.pagoApi.actualizar(this.pago.idPago!, cuerpo)
      : this.pagoApi.crear({ ...cuerpo, idUsuario: this.auth.sesion()!.idusuario });
    peticion.subscribe({
      next: () => {
        this.aviso.exito(this.pago ? 'Pago actualizado' : 'Pago registrado');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
