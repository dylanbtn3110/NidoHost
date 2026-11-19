import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

/** Operaciones CRUD comunes de un recurso de la API: GET, GET/{id}, POST, PUT/{id} y DELETE/{id}. */
export abstract class CrudService<T> {
  protected http = inject(HttpClient);

  protected constructor(protected readonly url: string) {}

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  obtener(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  crear(dato: T): Observable<T> {
    return this.http.post<T>(this.url, dato);
  }

  actualizar(id: number, dato: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, dato);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
