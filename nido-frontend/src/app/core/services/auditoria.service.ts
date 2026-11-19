import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditoria } from '../models';

/** Historial de acciones criticas (US22, solo ADMIN). */
@Injectable({ providedIn: 'root' })
export class AuditoriaService {
  private http = inject(HttpClient);

  listar(entidad?: string, usuario?: string): Observable<Auditoria[]> {
    const params: Record<string, string> = {};
    if (entidad) { params['entidad'] = entidad; }
    if (usuario) { params['usuario'] = usuario; }
    return this.http.get<Auditoria[]>('/api/v1/auditorias', { params });
  }
}
