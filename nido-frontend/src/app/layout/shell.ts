import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

const ICONOS: Record<string, string> = {
  '/panel': 'dashboard', '/alojamientos': 'apartment', '/reservas': 'event_available', '/calendario': 'calendar_month',
  '/huespedes': 'groups', '/servicios': 'cleaning_services', '/incidencias': 'report_problem', '/pagos': 'payments',
  '/reportes': 'bar_chart', '/usuarios': 'manage_accounts', '/auditoria': 'fact_check', '/personal': 'badge',
  '/mis-tareas': 'checklist',
};

/** Estructura de la aplicacion: menu lateral segun el rol, barra superior y contenido. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatToolbarModule, MatListModule,
    MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected auth = inject(AuthService);

  private pantallaChica = toSignal(
    inject(BreakpointObserver).observe('(max-width: 900px)').pipe(map(r => r.matches)), { initialValue: false });
  protected esMovil = computed(() => this.pantallaChica());
  protected menuAbierto = signal(false);

  /** El menu sale de las opciones que la API asigna al rol; se agrega el calendario junto a las reservas. */
  protected menu = computed(() => {
    const lista = this.auth.opciones().map(o => ({ nombre: o.nombre, ruta: o.ruta, icono: ICONOS[o.ruta] ?? 'circle' }));
    const posicion = lista.findIndex(o => o.ruta === '/reservas');
    if (posicion >= 0) {
      lista.splice(posicion + 1, 0, { nombre: 'Calendario', ruta: '/calendario', icono: ICONOS['/calendario'] });
    }
    return lista;
  });

  protected rol = computed(() => this.auth.sesion()?.roles[0] ?? '');
  protected iniciales = computed(() =>
    (this.auth.sesion()?.nombres ?? '').split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase());

  protected alternarMenu(): void {
    this.menuAbierto.update(v => !v);
  }

  protected alNavegar(): void {
    if (this.esMovil()) { this.menuAbierto.set(false); }
  }
}
