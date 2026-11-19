import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { aCampoFechaHora, aFechaHoraApi } from '../../core/fechas';
import { Alojamiento, Disponibilidad, Huesped, Reserva } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AuthService } from '../../core/services/auth.service';
import { HuespedService } from '../../core/services/huesped.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ReservaService } from '../../core/services/reserva.service';

/** Crear o editar una reserva. US07: consulta la disponibilidad al cambiar alojamiento o fechas y avisa de los solapamientos. */
@Component({
  selector: 'app-reserva-dialogo',
  imports: [DatePipe, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './reserva-dialogo.html',
  styleUrl: './reserva-dialogo.scss',
})
export class ReservaDialogo {
  private fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<ReservaDialogo, boolean>);
  private reservaApi = inject(ReservaService);
  private auth = inject(AuthService);
  private aviso = inject(NotificacionService);
  protected reserva = inject<Reserva | null>(MAT_DIALOG_DATA);

  protected canales = ['WEB', 'DIRECTO', 'AIRBNB', 'BOOKING'];
  protected estados = this.reserva ? ['CONFIRMADA', 'PENDIENTE', 'CANCELADA', 'FINALIZADA'] : ['CONFIRMADA', 'PENDIENTE'];

  protected alojamientos = signal<Alojamiento[]>([]);
  protected huespedes = signal<Huesped[]>([]);
  protected guardando = signal(false);

  protected form = this.fb.nonNullable.group({
    idAlojamiento: [this.reserva?.alojamiento.idAlojamiento ?? 0, Validators.min(1)],
    idHuesped: [this.reserva?.huesped.idHuesped ?? 0, Validators.min(1)],
    entrada: [aCampoFechaHora(this.reserva?.entrada), Validators.required],
    salida: [aCampoFechaHora(this.reserva?.salida), Validators.required],
    canal: [this.reserva?.canal ?? 'DIRECTO'],
    precio: this.fb.control<number | null>(this.reserva?.precio ?? null, Validators.min(0)),
    moneda: [this.reserva?.moneda ?? 'PEN', [Validators.required, Validators.maxLength(3)]],
    estado: [this.reserva?.estado ?? 'CONFIRMADA'],
  });

  /** Resultado de la ultima consulta de disponibilidad (null si aun no hay rango valido). */
  protected disponibilidad = signal<Disponibilidad | null>(null);
  protected fechasInvertidas = signal(false);

  /** Primer conflicto con otra reserva (al editar se ignora la propia reserva). */
  protected conflicto = computed(() =>
    this.disponibilidad()?.conflictos.find(c => c.idReserva !== this.reserva?.idReserva) ?? null);

  protected noches = computed(() => {
    const d = this.disponibilidad();
    if (!d) { return 0; }
    const dia = 24 * 60 * 60 * 1000;
    return Math.round((new Date(d.salida.substring(0, 10)).getTime() - new Date(d.entrada.substring(0, 10)).getTime()) / dia);
  });

  constructor() {
    inject(AlojamientoService).listar().subscribe(lista => this.alojamientos.set(lista));
    inject(HuespedService).listar().subscribe(lista => this.huespedes.set(lista));
    this.vigilarDisponibilidad();
  }

  /** Cada vez que cambian alojamiento, entrada o salida (con una pausa de 400 ms) consulta la API. */
  private vigilarDisponibilidad(): void {
    const campos = this.form.controls;
    merge(campos.idAlojamiento.valueChanges, campos.entrada.valueChanges, campos.salida.valueChanges).pipe(
      startWith(null),
      tap(() => this.disponibilidad.set(null)),
      debounceTime(400),
      map(() => this.form.getRawValue()),
      tap(v => this.fechasInvertidas.set(!!v.entrada && !!v.salida && v.salida <= v.entrada)),
      map(v => (v.idAlojamiento && v.entrada && v.salida && v.salida > v.entrada ? v : null)),
      distinctUntilChanged((a, b) => a?.idAlojamiento === b?.idAlojamiento && a?.entrada === b?.entrada && a?.salida === b?.salida),
      switchMap(v => {
        if (!v) { return of(null); }
        return this.reservaApi.disponibilidad(v.idAlojamiento, aFechaHoraApi(v.entrada), aFechaHoraApi(v.salida))
          .pipe(catchError(() => of(null)));
      }),
      takeUntilDestroyed(),
    ).subscribe(d => this.disponibilidad.set(d));
  }

  protected guardar(): void {
    if (this.form.invalid || this.fechasInvertidas()) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cuerpo: Reserva = {
      entrada: aFechaHoraApi(v.entrada),
      salida: aFechaHoraApi(v.salida),
      canal: v.canal,
      precio: v.precio ?? undefined,
      moneda: v.moneda,
      estado: v.estado,
      alojamiento: { idAlojamiento: v.idAlojamiento },
      huesped: { idHuesped: v.idHuesped },
    };
    this.guardando.set(true);
    const peticion = this.reserva
      ? this.reservaApi.actualizar(this.reserva.idReserva!, cuerpo)
      : this.reservaApi.crear({ ...cuerpo, idUsuario: this.auth.sesion()!.idusuario });
    peticion.subscribe({
      next: () => {
        this.aviso.exito(this.reserva ? 'Reserva actualizada' : 'Reserva creada');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
