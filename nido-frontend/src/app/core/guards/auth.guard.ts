import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Rol } from '../models';

/** Solo entra quien inicio sesion; si no, va al login. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.autenticado() ? true : inject(Router).createUrlTree(['/login']);
};

/** Solo entra quien tiene alguno de los roles indicados; si no, va a su pantalla inicial. */
export const rolGuard = (...roles: Rol[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  return auth.tieneRol(...roles) ? true : inject(Router).createUrlTree([auth.rutaInicial()]);
};
