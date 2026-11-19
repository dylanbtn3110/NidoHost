import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { Sesion } from '../models';
import { AuthService } from './auth.service';

const sesionPropietario: Sesion = {
  token: 'jwt-de-prueba', idusuario: 2, login: 'lmendoza', nombres: 'Lucia Mendoza',
  roles: ['PROPIETARIO'], opciones: [{ nombre: 'Panel', ruta: '/panel' }],
};

describe('AuthService', () => {
  let auth: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{ path: 'login', children: [] }])] });
    auth = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  it('inicia sesion, guarda el token y expone los roles', () => {
    auth.login('lmendoza', 'Nido2026!').subscribe();
    const peticion = http.expectOne('/api/v1/auth/login');
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual({ login: 'lmendoza', password: 'Nido2026!' });
    peticion.flush(sesionPropietario);

    expect(auth.autenticado()).toBe(true);
    expect(auth.token()).toBe('jwt-de-prueba');
    expect(auth.tieneRol('PROPIETARIO')).toBe(true);
    expect(auth.tieneRol('ADMIN')).toBe(false);
    expect(localStorage.getItem('nido.sesion')).toContain('jwt-de-prueba');
  });

  it('cierra la sesion y borra el token', () => {
    auth.login('lmendoza', 'Nido2026!').subscribe();
    http.expectOne('/api/v1/auth/login').flush(sesionPropietario);

    auth.logout();

    expect(auth.autenticado()).toBe(false);
    expect(auth.token()).toBeNull();
    expect(localStorage.getItem('nido.sesion')).toBeNull();
  });

  it('manda al personal a sus tareas y al resto al panel', () => {
    auth.login('rhuaman', 'Nido2026!').subscribe();
    http.expectOne('/api/v1/auth/login').flush({ ...sesionPropietario, roles: ['PERSONAL'] });
    expect(auth.rutaInicial()).toBe('/mis-tareas');

    auth.sesion.set(sesionPropietario);
    expect(auth.rutaInicial()).toBe('/panel');
  });
});
