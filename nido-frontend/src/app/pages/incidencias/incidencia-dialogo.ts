import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Subject, catchError, debounceTime, map, merge, of, switchMap, tap } from 'rxjs';
import { Alojamiento, Incidencia, SugerenciaIa } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AuthService } from '../../core/services/auth.service';
import { IaService } from '../../core/services/ia.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ServicioService } from '../../core/services/servicio.service';
import { EstadoChip } from '../../shared/estado-chip';

const MINIMO_PARA_IA = 8;

/** US13: crear o editar una incidencia. US17: la IA sugiere categoria y prioridad mientras se escribe la descripcion. */
@Component({
  selector: 'app-incidencia-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatProgressBarModule, EstadoChip],
  templateUrl: './incidencia-dialogo.html',
  styleUrl: './incidencia-dialogo.scss',
})
export class IncidenciaDialogo {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private incidencias = inject(IncidenciaService);
  private ia = inject(IaService);
  private aviso = inject(NotificacionService);
  private ref = inject(MatDialogRef<IncidenciaDialogo, boolean>);
  /** La incidencia a editar, o null si se esta creando una nueva. */
  protected incidencia = inject<Incidencia | null>(MAT_DIALOG_DATA);

  protected categorias = ['MANTENIMIENTO', 'LIMPIEZA', 'DANO', 'SEGURIDAD', 'OTRO'];
  protected prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  protected alojamientos = signal<Alojamiento[]>([]);
  protected guardando = signal(false);

  protected form = this.fb.nonNullable.group({
    idAlojamiento: [this.incidencia?.alojamiento.idAlojamiento ?? 0, [Validators.required, Validators.min(1)]],
    descripcion: [this.incidencia?.descripcion ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    categoria: [this.incidencia?.categoria ?? '', Validators.required],
    prioridad: [this.incidencia?.prioridad ?? '', Validators.required],
  });
  private valores = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  // ---- Sugerencia de la IA ----
  protected sugerencia = signal<SugerenciaIa | null>(null);
  protected pensando = signal(false);
  protected minimoParaIa = MINIMO_PARA_IA;
  protected descripcionLarga = computed(() => this.valores().descripcion!.trim().length >= MINIMO_PARA_IA);
  /** Ya se aplico la sugerencia mostrada: los selects tienen sus mismos valores. */
  protected aplicada = computed(() => {
    const s = this.sugerencia();
    return !!s && this.valores().categoria === s.categoria && this.valores().prioridad === s.prioridad;
  });
  private botonSugerir = new Subject<string>();
  /** Si la persona ya eligio categoria o prioridad (o esta editando), la IA no los cambia sola. */
  private eligioSelects = this.incidencia !== null;

  constructor() {
    const rol = this.auth.tieneRol('ADMIN', 'PROPIETARIO');
    // El personal no puede listar alojamientos: usa los de sus servicios asignados.
    const origen = rol
      ? inject(AlojamientoService).listar()
      : inject(ServicioService).misServicios().pipe(map(servicios => {
          const distintos = new Map<number, Alojamiento>();
          servicios.forEach(s => distintos.set(s.alojamiento.idAlojamiento!, s.alojamiento as Alojamiento));
          return [...distintos.values()];
        }));
    origen.subscribe(lista => this.alojamientos.set(lista));

    // Mientras se escribe (700 ms de pausa) o al pulsar el boton; switchMap descarta la peticion anterior.
    merge(this.form.controls.descripcion.valueChanges.pipe(debounceTime(700)), this.botonSugerir).pipe(
      map(texto => texto.trim()),
      tap(texto => {
        this.pensando.set(texto.length >= MINIMO_PARA_IA);
        if (texto.length < MINIMO_PARA_IA) { this.sugerencia.set(null); }
      }),
      switchMap(texto => texto.length < MINIMO_PARA_IA ? of(null)
        : this.ia.sugerir(texto).pipe(catchError(() => of(null)))),
      takeUntilDestroyed(),
    ).subscribe(sugerencia => {
      this.pensando.set(false);
      if (!sugerencia) { return; }
      this.sugerencia.set(sugerencia);
      if (!this.eligioSelects) {
        this.aplicar();
        this.eligioSelects = true;
      }
    });
  }

  protected pedirSugerencia(): void {
    this.botonSugerir.next(this.form.controls.descripcion.value);
  }

  protected aplicar(): void {
    const s = this.sugerencia();
    if (s) { this.form.patchValue({ categoria: s.categoria, prioridad: s.prioridad }); }
  }

  protected elegirManual(): void {
    this.eligioSelects = true;
  }

  protected porcentaje(confianza: number): number {
    return Math.round(confianza * 100);
  }

  protected palabra(clave: string): string {
    return clave.replaceAll('_', ' ');
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const datos: Incidencia = {
      idUsuario: this.auth.sesion()!.idusuario,
      categoria: v.categoria,
      prioridad: v.prioridad,
      descripcion: v.descripcion.trim(),
      alojamiento: { idAlojamiento: v.idAlojamiento },
    };
    this.guardando.set(true);
    const peticion = this.incidencia
      ? this.incidencias.actualizar(this.incidencia.idIncidencia!, { ...datos, estado: this.incidencia.estado })
      : this.incidencias.crear(datos);
    peticion.subscribe({
      next: () => {
        this.aviso.exito(this.incidencia ? 'Incidencia actualizada' : 'Incidencia registrada');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
