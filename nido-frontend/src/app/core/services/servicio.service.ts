import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evidencia, ItemChecklist, Servicio } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class ServicioService extends CrudService<Servicio> {
  constructor() { super('/api/v1/servicios'); }

  /** Servicios asignados al personal que inicio sesion. */
  misServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.url}/mis-servicios`);
  }

  /** ACEPTADO, RECHAZADO, EN_PROCESO, COMPLETADO o CANCELADO. */
  cambiarEstado(id: number, estado: string): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.url}/${id}/estado`, { estado });
  }

  actualizarChecklist(id: number, items: Pick<ItemChecklist, 'item' | 'hecho'>[]): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.url}/${id}/checklist`, items);
  }

  evidencias(id: number): Observable<Evidencia[]> {
    return this.http.get<Evidencia[]>(`${this.url}/${id}/evidencias`);
  }

  /** Sube una foto (JPG, PNG o WEBP de hasta 5 MB) como multipart/form-data. */
  subirEvidencia(id: number, idUsuario: number, archivo: File): Observable<Evidencia> {
    const datos = new FormData();
    datos.append('idUsuario', String(idUsuario));
    datos.append('archivo', archivo);
    return this.http.post<Evidencia>(`${this.url}/${id}/evidencias`, datos);
  }

  /** La foto exige el token, por eso se descarga como Blob en lugar de usar un enlace directo. */
  archivoEvidencia(idEvidencia: number): Observable<Blob> {
    return this.http.get(`/api/v1/evidencias/${idEvidencia}/archivo`, { responseType: 'blob' });
  }
}
