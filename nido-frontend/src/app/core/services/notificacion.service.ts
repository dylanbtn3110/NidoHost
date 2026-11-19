import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Mensajes breves (toast) de exito, error o aviso. */
@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private snackBar = inject(MatSnackBar);

  exito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 4000, panelClass: 'toast-exito' });
  }

  error(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 6000, panelClass: 'toast-error' });
  }
}
