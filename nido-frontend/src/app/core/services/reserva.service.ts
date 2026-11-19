import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disponibilidad, Reserva } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class ReservaService extends CrudService<Reserva> {
  constructor() { super('/api/v1/reservas'); }

  cancelar(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.url}/${id}/cancelar`, {});
  }

  /** Indica si el alojamiento esta libre en el rango; si no, devuelve las reservas en conflicto. */
  disponibilidad(idAlojamiento: number, entrada: string, salida: string): Observable<Disponibilidad> {
    return this.http.get<Disponibilidad>(`${this.url}/disponibilidad`, { params: { idAlojamiento, entrada, salida } });
  }
}
