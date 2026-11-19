import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Servicio } from '../../core/models';
import { EstadoChip } from '../../shared/estado-chip';
import { leerChecklist, progresoChecklist } from './checklist';
import { GaleriaEvidencias } from './galeria-evidencias';

/** US11/US12 (vista del propietario): datos del servicio, checklist en solo lectura y fotos de evidencia. */
@Component({
  selector: 'app-servicio-detalle-dialogo',
  imports: [DatePipe, MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule, EstadoChip, GaleriaEvidencias],
  templateUrl: './servicio-detalle-dialogo.html',
  styleUrl: './servicio-detalle-dialogo.scss',
})
export class ServicioDetalleDialogo {
  protected servicio = inject<Servicio>(MAT_DIALOG_DATA);
  protected items = leerChecklist(this.servicio.checklist);
  protected progreso = progresoChecklist(this.items);
}
