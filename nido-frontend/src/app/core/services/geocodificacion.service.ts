import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Geocodificacion } from '../models';

/** API externa OpenStreetMap (US04): coordenadas sugeridas para una direccion. */
@Injectable({ providedIn: 'root' })
export class GeocodificacionService {
  private http = inject(HttpClient);

  buscar(direccion: string): Observable<Geocodificacion> {
    return this.http.get<Geocodificacion>('/api/v1/geocodificacion', { params: { direccion } });
  }
}
