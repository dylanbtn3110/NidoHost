import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoCalendario, ReporteIngresos, ReporteOcupacion, ReporteOperacion } from '../models';

/** Reportes (US08, US14, US15). Las fechas van como yyyy-MM-dd. */
@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);
  private url = '/api/v1/reportes';

  ingresos(fechaInicio: string, fechaFin: string): Observable<ReporteIngresos> {
    return this.http.get<ReporteIngresos>(`${this.url}/ingresos`, { params: { fechaInicio, fechaFin } });
  }

  ocupacion(fechaInicio: string, fechaFin: string): Observable<ReporteOcupacion> {
    return this.http.get<ReporteOcupacion>(`${this.url}/ocupacion`, { params: { fechaInicio, fechaFin } });
  }

  operacion(fechaInicio: string, fechaFin: string): Observable<ReporteOperacion> {
    return this.http.get<ReporteOperacion>(`${this.url}/operacion`, { params: { fechaInicio, fechaFin } });
  }

  calendario(fechaInicio: string, fechaFin: string, idAlojamiento?: number): Observable<EventoCalendario[]> {
    const params: Record<string, string | number> = { fechaInicio, fechaFin };
    if (idAlojamiento) { params['idAlojamiento'] = idAlojamiento; }
    return this.http.get<EventoCalendario[]>(`${this.url}/calendario`, { params });
  }
}
