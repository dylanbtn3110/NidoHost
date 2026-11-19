import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class IncidenciaService extends CrudService<Incidencia> {
  constructor() { super('/api/v1/incidencias'); }

  /** Filtros opcionales: estado, prioridad e idAlojamiento. */
  buscar(filtros: { estado?: string; prioridad?: string; idAlojamiento?: number } = {}): Observable<Incidencia[]> {
    const params: Record<string, string | number> = {};
    Object.entries(filtros).forEach(([clave, valor]) => {
      if (valor !== undefined && valor !== null && valor !== '') { params[clave] = valor; }
    });
    return this.http.get<Incidencia[]>(this.url, { params });
  }

  cambiarEstado(id: number, estado: string): Observable<Incidencia> {
    return this.http.patch<Incidencia>(`${this.url}/${id}/estado`, { estado });
  }
}
