import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificacionService } from '../services/notificacion.service';

/** Convierte los errores de la API en mensajes claros; si el token vencio (401) vuelve al login. */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const avisos = inject(NotificacionService);
  return next(req).pipe(catchError((e: HttpErrorResponse) => {
    const esLogin = req.url.endsWith('/auth/login');
    if (e.status === 401 && !esLogin) {
      avisos.error('Su sesión venció. Inicie sesión de nuevo.');
      auth.logout();
    } else if (!esLogin) {
      avisos.error(mensajeDe(e));
    }
    return throwError(() => e);
  }));
};

/** Texto del error: el mensaje de la API y, si hay, el detalle por campo. */
export function mensajeDe(e: HttpErrorResponse): string {
  if (e.status === 0) {
    return 'No hay conexión con el servidor.';
  }
  const api = e.error;
  const campos = api?.campos ? ' ' + Object.values(api.campos).join('. ') : '';
  return (api?.mensaje ?? 'Ocurrió un error inesperado.') + (api?.campos ? campos : '');
}
