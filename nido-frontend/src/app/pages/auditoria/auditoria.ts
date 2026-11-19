import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, merge } from 'rxjs';
import { Auditoria } from '../../core/models';
import { AuditoriaService } from '../../core/services/auditoria.service';

const ENTIDADES = ['alojamientos', 'huespedes', 'reservas', 'pagos', 'servicios', 'incidencias', 'usuarios', 'evidencias', 'roles'];

/** Color de la etiqueta de cada operacion (clases de .chip-estado). */
const TONO_OPERACION: Record<string, string> = { CREAR: 'bueno', ACTUALIZAR: 'atencion', ELIMINAR: 'malo' };

/** Textos del paginador en español. */
class PaginadorEspanol extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Filas por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (pagina: number, tamano: number, total: number) => {
    if (total === 0) { return '0 de 0'; }
    const desde = pagina * tamano + 1;
    return `${desde} – ${Math.min(desde + tamano - 1, total)} de ${total}`;
  };
}

/** US22: bitacora de acciones criticas (solo ADMIN). La API ya entrega los registros del mas reciente al mas antiguo. */
@Component({
  selector: 'app-auditoria',
  imports: [ReactiveFormsModule, DatePipe, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginadorEspanol }],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.scss',
})
export class AuditoriaPage {
  private servicio = inject(AuditoriaService);

  protected entidades = ENTIDADES;
  protected entidad = new FormControl('', { nonNullable: true });
  protected usuario = new FormControl('', { nonNullable: true });

  protected registros = signal<Auditoria[]>([]);
  protected cargando = signal(true);
  protected pagina = signal(0);
  protected tamano = signal(10);

  protected columnas = ['fecha', 'usuario', 'entidad', 'operacion', 'idRegistro', 'detalle'];
  protected visibles = computed(() => this.registros().slice(this.pagina() * this.tamano(), (this.pagina() + 1) * this.tamano()));

  constructor() {
    // Los filtros consultan la API: el usuario se espera 400 ms despues de la ultima tecla.
    merge(this.entidad.valueChanges, this.usuario.valueChanges.pipe(debounceTime(400)))
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.cargar());
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.servicio.listar(this.entidad.value, this.usuario.value.trim()).subscribe({
      next: lista => {
        this.registros.set(lista);
        this.pagina.set(0);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  protected cambiarPagina(e: PageEvent): void {
    this.pagina.set(e.pageIndex);
    this.tamano.set(e.pageSize);
  }

  protected tono(operacion: string): string {
    return TONO_OPERACION[operacion] ?? 'neutro';
  }
}
