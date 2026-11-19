import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloIa, SugerenciaIa } from '../models';

/** IA de incidencias (US17): sugiere categoria y prioridad a partir de la descripcion. */
@Injectable({ providedIn: 'root' })
export class IaService {
  private http = inject(HttpClient);
  private url = '/api/v1/ia/incidencias';

  sugerir(descripcion: string): Observable<SugerenciaIa> {
    return this.http.post<SugerenciaIa>(`${this.url}/sugerencia`, { descripcion });
  }

  modelo(): Observable<ModeloIa> { return this.http.get<ModeloIa>(`${this.url}/modelo`); }

  reentrenar(): Observable<ModeloIa> { return this.http.post<ModeloIa>(`${this.url}/reentrenar`, {}); }
}
