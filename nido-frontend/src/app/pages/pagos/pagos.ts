import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pago } from '../../core/models';
import { NotificacionService } from '../../core/services/notificacion.service';
import { PagoService } from '../../core/services/pago.service';
import { ConfirmarService } from '../../shared/confirmar-dialogo';
import { EstadoChip } from '../../shared/estado-chip';
import { PagoDialogo } from './pago-dialogo';

/** US14: registro de pagos (ingresos y gastos) con resumen de totales. */
@Component({
  selector: 'app-pagos',
  imports: [
    CurrencyPipe, DatePipe, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule,
    MatSelectModule, MatTableModule, MatTooltipModule, EstadoChip,
  ],
  templateUrl: './pagos.html',
})
export class PagosPage {
  private pagoApi = inject(PagoService);
  private dialogo = inject(MatDialog);
  private confirmar = inject(ConfirmarService);
  private aviso = inject(NotificacionService);

  protected columnas = ['id', 'fecha', 'reserva', 'tipo', 'importe', 'moneda', 'estado', 'acciones'];
  protected tipos = ['INGRESO', 'GASTO'];
  protected estados = ['PAGADO', 'PENDIENTE', 'ANULADO'];

  protected pagos = signal<Pago[]>([]);
  protected cargando = signal(true);
  protected filtroTipo = signal('');
  protected filtroEstado = signal('');

  protected lista = computed(() =>
    this.pagos().filter(p => (!this.filtroTipo() || p.tipo === this.filtroTipo()) && (!this.filtroEstado() || p.estado === this.filtroEstado())));

  // Totales sobre todos los pagos que no estan anulados
  private vigentes = computed(() => this.pagos().filter(p => p.estado !== 'ANULADO'));
  private suma = (tipo: string, estado: string) =>
    this.vigentes().filter(p => p.tipo === tipo && p.estado === estado).reduce((total, p) => total + p.importe, 0);
  protected ingresos = computed(() => this.suma('INGRESO', 'PAGADO'));
  protected gastos = computed(() => this.suma('GASTO', 'PAGADO'));
  protected neto = computed(() => this.ingresos() - this.gastos());
  protected pendiente = computed(() => this.suma('INGRESO', 'PENDIENTE'));

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.pagoApi.listar().subscribe({
      next: lista => {
        this.pagos.set(lista);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  protected abrir(pago?: Pago): void {
    this.dialogo.open(PagoDialogo, { data: pago ?? null, width: '600px', maxWidth: '95vw' })
      .afterClosed().subscribe(guardado => {
        if (guardado) { this.cargar(); }
      });
  }

  protected async anular(p: Pago): Promise<void> {
    const ok = await this.confirmar.pedir('Anular pago', `¿Anular el pago #${p.idPago}? Dejara de contarse en los totales.`, 'Anular');
    if (!ok) { return; }
    const cuerpo: Pago = { tipo: p.tipo, importe: p.importe, moneda: p.moneda, fecha: p.fecha, estado: 'ANULADO', reserva: { idReserva: p.reserva.idReserva } };
    this.pagoApi.actualizar(p.idPago!, cuerpo).subscribe(() => {
      this.aviso.exito('Pago anulado');
      this.cargar();
    });
  }

  protected async eliminar(p: Pago): Promise<void> {
    const ok = await this.confirmar.pedir('Eliminar pago', `¿Eliminar el pago #${p.idPago}? Esta accion no se puede deshacer.`);
    if (!ok) { return; }
    this.pagoApi.eliminar(p.idPago!).subscribe(() => {
      this.aviso.exito('Pago eliminado');
      this.cargar();
    });
  }
}
