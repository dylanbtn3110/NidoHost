import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard, rolGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
import { Shell } from './layout/shell';

const gestion = rolGuard('ADMIN', 'PROPIETARIO');
const todos = rolGuard('ADMIN', 'PROPIETARIO', 'PERSONAL');

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginPage) },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: () => inject(AuthService).rutaInicial() },
      { path: 'panel', canActivate: [gestion], loadComponent: () => import('./pages/panel/panel').then(m => m.PanelPage) },
      { path: 'alojamientos', canActivate: [gestion], loadComponent: () => import('./pages/alojamientos/alojamientos').then(m => m.AlojamientosPage) },
      { path: 'reservas', canActivate: [gestion], loadComponent: () => import('./pages/reservas/reservas').then(m => m.ReservasPage) },
      { path: 'calendario', canActivate: [gestion], loadComponent: () => import('./pages/calendario/calendario').then(m => m.CalendarioPage) },
      { path: 'huespedes', canActivate: [gestion], loadComponent: () => import('./pages/huespedes/huespedes').then(m => m.HuespedesPage) },
      { path: 'servicios', canActivate: [gestion], loadComponent: () => import('./pages/servicios/servicios').then(m => m.ServiciosPage) },
      { path: 'personal', canActivate: [gestion], loadComponent: () => import('./pages/personal/personal').then(m => m.PersonalPage) },
      { path: 'incidencias', canActivate: [todos], loadComponent: () => import('./pages/incidencias/incidencias').then(m => m.IncidenciasPage) },
      { path: 'pagos', canActivate: [gestion], loadComponent: () => import('./pages/pagos/pagos').then(m => m.PagosPage) },
      { path: 'reportes', canActivate: [gestion], loadComponent: () => import('./pages/reportes/reportes').then(m => m.ReportesPage) },
      { path: 'usuarios', canActivate: [rolGuard('ADMIN')], loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.UsuariosPage) },
      { path: 'auditoria', canActivate: [rolGuard('ADMIN')], loadComponent: () => import('./pages/auditoria/auditoria').then(m => m.AuditoriaPage) },
      { path: 'mis-tareas', canActivate: [rolGuard('PERSONAL')], loadComponent: () => import('./pages/mis-tareas/mis-tareas').then(m => m.MisTareasPage) },
    ],
  },
  { path: '**', redirectTo: '' },
];
