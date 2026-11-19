import { Component, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription, forkJoin, map, of, switchMap } from 'rxjs';
import { Evidencia } from '../../core/models';
import { ServicioService } from '../../core/services/servicio.service';

interface Foto { evidencia: Evidencia; url: string; }

/** Miniaturas de las fotos de evidencia de un servicio. Cada foto se descarga como Blob porque exige el token. */
@Component({
  selector: 'app-galeria-evidencias',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (cargando()) {
      <div class="cargando"><mat-spinner diameter="28" /></div>
    } @else {
      @for (foto of fotos(); track foto.evidencia.idEvidencia) {
        <a [href]="foto.url" target="_blank" rel="noopener" class="foto">
          <img [src]="foto.url" [alt]="foto.evidencia.nombreArchivo" />
        </a>
      } @empty {
        <p class="mensaje-ayuda">Aún no hay evidencias.</p>
      }
    }`,
  styles: `
    :host { display: flex; flex-wrap: wrap; gap: 10px; }
    .foto { display: block; width: 104px; height: 104px; border-radius: 8px; overflow: hidden; border: 1px solid var(--nido-borde); }
    img { width: 100%; height: 100%; object-fit: cover; }
    .cargando { padding: 12px; }`,
})
export class GaleriaEvidencias {
  private servicios = inject(ServicioService);

  idServicio = input.required<number>();
  /** Cambia cada vez que se sube una foto nueva, para volver a cargar la lista. */
  version = input(0);

  protected fotos = signal<Foto[]>([]);
  protected cargando = signal(true);
  private peticion?: Subscription;

  constructor() {
    effect(() => {
      const id = this.idServicio();
      this.version();
      untracked(() => this.cargar(id));
    });
    inject(DestroyRef).onDestroy(() => {
      this.peticion?.unsubscribe();
      this.liberar();
    });
  }

  private cargar(id: number): void {
    this.peticion?.unsubscribe();
    this.peticion = this.servicios.evidencias(id).pipe(
      switchMap(lista => lista.length === 0 ? of([]) : forkJoin(lista.map(evidencia =>
        this.servicios.archivoEvidencia(evidencia.idEvidencia).pipe(
          map(blob => ({ evidencia, url: URL.createObjectURL(blob) }))))))
    ).subscribe({
      next: fotos => {
        this.liberar();
        this.fotos.set(fotos);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  /** Libera la memoria de las fotos que ya no se muestran. */
  private liberar(): void {
    this.fotos().forEach(f => URL.revokeObjectURL(f.url));
    this.fotos.set([]);
  }
}
