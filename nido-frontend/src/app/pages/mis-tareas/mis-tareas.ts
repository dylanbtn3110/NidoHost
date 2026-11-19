import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ItemChecklist, Servicio } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ServicioService } from '../../core/services/servicio.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { leerChecklist, progresoChecklist } from '../servicios/checklist';
import { GaleriaEvidencias } from '../servicios/galeria-evidencias';

const TIPOS_DE_FOTO = ['image/jpeg', 'image/png', 'image/webp'];
const MAXIMO_BYTES = 5 * 1024 * 1024;
const FINALIZADOS = ['COMPLETADO', 'CANCELADO', 'RECHAZADO'];

/** US10, US11 y US12 (vista movil del personal): aceptar tareas, llenar el checklist, subir fotos y completar. */
@Component({
  selector: 'app-mis-tareas',
  imports: [DatePipe, NgTemplateOutlet, MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressBarModule,
    MatProgressSpinnerModule, EstadoChip, GaleriaEvidencias],
  templateUrl: './mis-tareas.html',
  styleUrl: './mis-tareas.scss',
})
export class MisTareasPage {
  private servicios = inject(ServicioService);
  private auth = inject(AuthService);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);
  private router = inject(Router);

  protected lista = signal<Servicio[]>([]);
  protected cargando = signal(true);
  /** Servicio con una operacion en curso: bloquea sus botones para evitar doble clic. */
  protected ocupado = signal<number | null>(null);
  /** Cuenta de fotos subidas por servicio: hace que la galeria vuelva a cargar. */
  protected fotosSubidas = signal<Record<number, number>>({});

  protected porAtender = computed(() => this.lista()
    .filter(s => !FINALIZADOS.includes(s.estado ?? ''))
    .sort((a, b) => a.inicio.localeCompare(b.inicio)));
  protected historial = computed(() => this.lista()
    .filter(s => FINALIZADOS.includes(s.estado ?? ''))
    .sort((a, b) => b.inicio.localeCompare(a.inicio)));

  constructor() {
    this.cargar();
  }

  private cargar(): void {
    this.servicios.misServicios().subscribe({
      next: lista => { this.lista.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected items(servicio: Servicio): ItemChecklist[] {
    return leerChecklist(servicio.checklist);
  }

  protected progreso(servicio: Servicio) {
    return progresoChecklist(this.items(servicio));
  }

  protected async cambiarEstado(servicio: Servicio, estado: string): Promise<void> {
    if (estado === 'RECHAZADO' && !await this.confirmar.pedir('Rechazar tarea',
      `¿Rechazar la tarea en ${servicio.alojamiento.nombre}? Se avisará al propietario.`, 'Rechazar')) {
      return;
    }
    this.ocupado.set(servicio.idServicio!);
    this.servicios.cambiarEstado(servicio.idServicio!, estado).subscribe({
      next: () => {
        this.ocupado.set(null);
        this.aviso.exito(estado === 'COMPLETADO' ? 'Servicio completado' : `Tarea ${estado.replace('_', ' ').toLowerCase()}`);
        this.cargar();
      },
      error: () => this.ocupado.set(null),
    });
  }

  /** Marca o desmarca un item: se envia todo el checklist y, si la API falla, se deja como estaba. */
  protected marcar(servicio: Servicio, item: ItemChecklist, hecho: boolean): void {
    const anterior = servicio.checklist;
    const nuevos = this.items(servicio).map(i => i.item === item.item ? { ...i, hecho } : i);
    this.reemplazar(servicio.idServicio!, JSON.stringify(nuevos));
    this.servicios.actualizarChecklist(servicio.idServicio!, nuevos.map(i => ({ item: i.item, hecho: i.hecho }))).subscribe({
      error: () => this.reemplazar(servicio.idServicio!, anterior),
    });
  }

  private reemplazar(id: number, checklist?: string | null): void {
    this.lista.update(lista => lista.map(s => s.idServicio === id ? { ...s, checklist } : s));
  }

  protected subirFoto(servicio: Servicio, evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const archivo = campo.files?.[0];
    campo.value = '';
    if (!archivo) { return; }
    if (!TIPOS_DE_FOTO.includes(archivo.type)) {
      this.aviso.error('La foto debe ser JPG, PNG o WEBP.');
      return;
    }
    if (archivo.size > MAXIMO_BYTES) {
      this.aviso.error('La foto supera los 5 MB permitidos.');
      return;
    }
    const id = servicio.idServicio!;
    this.ocupado.set(id);
    this.servicios.subirEvidencia(id, this.auth.sesion()!.idusuario, archivo).subscribe({
      next: () => {
        this.ocupado.set(null);
        this.aviso.exito('Foto subida');
        this.fotosSubidas.update(c => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
      },
      error: () => this.ocupado.set(null),
    });
  }

  protected reportarIncidencia(): void {
    this.router.navigateByUrl('/incidencias');
  }
}
