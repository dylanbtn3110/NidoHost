import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

interface DatosConfirmacion { titulo: string; mensaje: string; boton: string; }

@Component({
  selector: 'app-confirmar-dialogo',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ datos.titulo }}</h2>
    <mat-dialog-content>{{ datos.mensaje }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-flat-button [mat-dialog-close]="true">{{ datos.boton }}</button>
    </mat-dialog-actions>`,
})
export class ConfirmarDialogo {
  protected datos = inject<DatosConfirmacion>(MAT_DIALOG_DATA);
}

/** Pide confirmacion antes de una accion que no se puede deshacer (por ejemplo, eliminar). */
@Injectable({ providedIn: 'root' })
export class ConfirmarService {
  private dialogo = inject(MatDialog);

  async pedir(titulo: string, mensaje: string, boton = 'Eliminar'): Promise<boolean> {
    const ref = this.dialogo.open(ConfirmarDialogo, { data: { titulo, mensaje, boton }, width: '420px' });
    return (await firstValueFrom(ref.afterClosed())) === true;
  }
}
