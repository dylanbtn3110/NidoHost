import { Component, computed, input } from '@angular/core';

const BUENOS = ['ACTIVO', 'DISPONIBLE', 'CONFIRMADA', 'COMPLETADO', 'PAGADO', 'RESUELTA', 'CERRADA', 'INGRESO', 'ACEPTADO', 'BAJA', 'FINALIZADA'];
const ATENCION = ['PENDIENTE', 'ASIGNADO', 'EN_PROCESO', 'ABIERTA', 'MEDIA', 'GASTO'];
const MALOS = ['INACTIVO', 'CANCELADA', 'CANCELADO', 'ANULADO', 'RECHAZADO', 'CRITICA', 'ALTA'];

/** Etiqueta de color para un estado o una prioridad (verde, ambar o rojo). */
@Component({
  selector: 'app-estado',
  template: `<span class="chip-estado" [class]="'chip-estado ' + tono()">{{ texto() }}</span>`,
})
export class EstadoChip {
  valor = input<string | null | undefined>('');

  protected texto = computed(() => (this.valor() ?? '').replaceAll('_', ' '));
  protected tono = computed(() => {
    const v = (this.valor() ?? '').toUpperCase();
    return BUENOS.includes(v) ? 'bueno' : ATENCION.includes(v) ? 'atencion' : MALOS.includes(v) ? 'malo' : 'neutro';
  });
}
