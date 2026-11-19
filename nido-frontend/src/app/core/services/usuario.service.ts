import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends CrudService<Usuario> {
  constructor() { super('/api/v1/usuarios'); }

  /** ACTIVO o INACTIVO. */
  cambiarEstado(id: number, estado: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.url}/${id}/estado`, { estado });
  }

  // ---- Personal operativo (US09) ----
  personal(soloActivos = false): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/personal`, { params: { soloActivos } });
  }

  registrarPersonal(personal: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/personal`, personal);
  }

  cambiarEstadoPersonal(id: number, estado: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.url}/personal/${id}/estado`, { estado });
  }
}
