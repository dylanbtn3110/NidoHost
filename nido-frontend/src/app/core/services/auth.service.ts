import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Rol, Sesion } from '../models';

const CLAVE = 'nido.sesion';

/** Inicio de sesion con JWT: guarda el token y los datos del usuario en el navegador. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly sesion = signal<Sesion | null>(this.leer());
  readonly autenticado = computed(() => this.sesion() !== null);
  readonly opciones = computed(() => this.sesion()?.opciones ?? []);

  login(login: string, password: string): Observable<Sesion> {
    return this.http.post<Sesion>('/api/v1/auth/login', { login, password }).pipe(
      tap(sesion => {
        localStorage.setItem(CLAVE, JSON.stringify(sesion));
        this.sesion.set(sesion);
      }));
  }

  logout(): void {
    localStorage.removeItem(CLAVE);
    this.sesion.set(null);
    this.router.navigateByUrl('/login');
  }

  token(): string | null {
    return this.sesion()?.token ?? null;
  }

  tieneRol(...roles: Rol[]): boolean {
    return this.sesion()?.roles.some(r => roles.includes(r)) ?? false;
  }

  /** Pantalla inicial segun el rol: el personal va a sus tareas. */
  rutaInicial(): string {
    return this.tieneRol('ADMIN', 'PROPIETARIO') ? '/panel' : '/mis-tareas';
  }

  private leer(): Sesion | null {
    try {
      const texto = localStorage.getItem(CLAVE);
      return texto ? (JSON.parse(texto) as Sesion) : null;
    } catch {
      return null;
    }
  }
}
