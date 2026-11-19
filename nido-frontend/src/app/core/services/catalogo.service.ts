import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais, Ubigeo } from '../models';

interface RolConOpciones { idrol: number; nombre: string; estado: string; }

/** Listas de apoyo para los formularios: ubigeos, paises y roles. */
@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private http = inject(HttpClient);

  ubigeos(): Observable<Ubigeo[]> { return this.http.get<Ubigeo[]>('/api/v1/ubigeos'); }
  paises(): Observable<Pais[]> { return this.http.get<Pais[]>('/api/v1/paises'); }
  roles(): Observable<RolConOpciones[]> { return this.http.get<RolConOpciones[]>('/api/v1/roles'); }
}
