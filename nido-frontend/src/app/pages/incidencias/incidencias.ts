import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Incidencia } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { IncidenciaDialogo } from './incidencia-dialogo';
import { ModeloIaDialogo } from './modelo-ia-dialogo';

/** US13 (registrar y seguir incidencias) y US17 (sugerencia de categoria y prioridad con IA, en el dialogo). */
@Component({
  selector: 'app-incidencias',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatMenuModule, MatTooltipModule, MatProgressSpinnerModule, EstadoChip],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.scss',
})
export class IncidenciasPage {
  private incidencias = inject(IncidenciaService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);
  protected auth = inject(AuthService);

  protected puedeGestionar = this.auth.tieneRol('ADMIN', 'PROPIETARIO');
  protected columnas = ['id', 'alojamiento', 'categoria', 'prioridad', 'descripcion', 'estado', 'acciones'];
  protected estados = ['ABIERTA', 'EN_PROCESO', 'RESUELTA', 'CERRADA'];
  protected prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  protected cambios = ['EN_PROCESO', 'RESUELTA', 'CERRADA'];

  protected lista = signal<Incidencia[]>([]);
  protected cargando = signal(true);
  protected filtroEstado = signal('');
  protected filtroPrioridad = signal('');
  protected texto = signal('');

  protected resumen = computed(() => [
    { estado: 'ABIERTA', titulo: 'Abiertas' },
    { estado: 'EN_PROCESO', titulo: 'En proceso' },
    { estado: 'RESUELTA', titulo: 'Resueltas' },
  ].map(r => ({ ...r, cantidad: this.lista().filter(i => i.estado === r.estado).length })));

  protected filtradas = computed(() => {
    const buscado = this.texto().trim().toLowerCase();
    return this.lista().filter(i =>
      (!this.filtroEstado() || i.estado === this.filtroEstado()) &&
      (!this.filtroPrioridad() || i.prioridad === this.filtroPrioridad()) &&
      (!buscado || `${i.descripcion} ${i.alojamiento.nombre} ${i.categoria}`.toLowerCase().includes(buscado)));
  });

  constructor() {
    this.cargar();
  }

  private cargar(): void {
    this.incidencias.listar().subscribe({
      next: lista => { this.lista.set(lista); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  protected abrirFormulario(incidencia?: Incidencia): void {
    this.dialogo.open(IncidenciaDialogo, { data: incidencia ?? null, width: '640px', maxWidth: '95vw' })
      .afterClosed().subscribe(guardada => {
        if (guardada) { this.cargar(); }
      });
  }

  protected verModelo(): void {
    this.dialogo.open(ModeloIaDialogo, { width: '560px', maxWidth: '95vw' });
  }

  protected cambiarEstado(incidencia: Incidencia, estado: string): void {
    this.incidencias.cambiarEstado(incidencia.idIncidencia!, estado).subscribe(() => {
      this.aviso.exito(`Incidencia ${estado.replace('_', ' ').toLowerCase()}`);
      this.cargar();
    });
  }

  protected async eliminar(incidencia: Incidencia): Promise<void> {
    const si = await this.confirmar.pedir('Eliminar incidencia',
      `¿Eliminar la incidencia #${incidencia.idIncidencia} de ${incidencia.alojamiento.nombre}? No se puede deshacer.`);
    if (!si) { return; }
    this.incidencias.eliminar(incidencia.idIncidencia!).subscribe(() => {
      this.aviso.exito('Incidencia eliminada');
      this.cargar();
    });
  }
}
