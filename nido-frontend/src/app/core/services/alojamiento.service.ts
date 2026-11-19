import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alojamiento } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class AlojamientoService extends CrudService<Alojamiento> {
  constructor() { super('/api/v1/alojamientos'); }

  porEstado(estado: string): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(`${this.url}/estado/${estado}`);
  }

  confirmarUbicacion(id: number, latitud: number, longitud: number): Observable<Alojamiento> {
    return this.http.patch<Alojamiento>(`${this.url}/${id}/ubicacion`, { latitud, longitud });
  }
}
