import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { Sesion } from '../models';
import { AuthService } from '../services/auth.service';
import { authGuard, rolGuard } from './auth.guard';

const sesion = (roles: Sesion['roles']): Sesion => ({ token: 't', idusuario: 1, login: 'x', nombres: 'X', roles, opciones: [] });

describe('guards', () => {
  let auth: AuthService;
  const ruta = {} as ActivatedRouteSnapshot;
  const estado = {} as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideRouter([])] });
    auth = TestBed.inject(AuthService);
  });

  const ejecutar = (guard: typeof authGuard) => TestBed.runInInjectionContext(() => guard(ruta, estado));

  it('sin sesion lleva al login', () => {
    const resultado = ejecutar(authGuard) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(resultado)).toBe('/login');
  });

  it('con sesion deja pasar', () => {
    auth.sesion.set(sesion(['PROPIETARIO']));
    expect(ejecutar(authGuard)).toBe(true);
  });

  it('el guard de rol deja pasar al rol permitido', () => {
    auth.sesion.set(sesion(['ADMIN']));
    expect(ejecutar(rolGuard('ADMIN'))).toBe(true);
  });

  it('el guard de rol manda al personal a su pantalla inicial si intenta entrar a una pantalla de gestion', () => {
    auth.sesion.set(sesion(['PERSONAL']));
    const resultado = ejecutar(rolGuard('ADMIN', 'PROPIETARIO')) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(resultado)).toBe('/mis-tareas');
  });
});
