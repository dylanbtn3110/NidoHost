import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModeloIa } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { IaService } from '../../core/services/ia.service';
import { NotificacionService } from '../../core/services/notificacion.service';

/** US17: ficha del modelo de IA (Naive Bayes) con su precision; el ADMIN puede reentrenarlo. */
@Component({
  selector: 'app-modelo-ia-dialogo',
  imports: [DatePipe, MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule],
  templateUrl: './modelo-ia-dialogo.html',
  styleUrl: './modelo-ia-dialogo.scss',
})
export class ModeloIaDialogo {
  private ia = inject(IaService);
  private aviso = inject(NotificacionService);

  protected esAdmin = inject(AuthService).tieneRol('ADMIN');
  protected modelo = signal<ModeloIa | null>(null);
  protected entrenando = signal(false);

  constructor() {
    this.ia.modelo().subscribe(modelo => this.modelo.set(modelo));
  }

  protected porcentaje(valor: number): number {
    return Math.round(valor * 100);
  }

  protected reentrenar(): void {
    this.entrenando.set(true);
    this.ia.reentrenar().subscribe({
      next: modelo => {
        this.modelo.set(modelo);
        this.entrenando.set(false);
        this.aviso.exito('Modelo reentrenado con las incidencias registradas');
      },
      error: () => this.entrenando.set(false),
    });
  }
}
