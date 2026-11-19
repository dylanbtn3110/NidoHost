import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/** US01: inicio de sesion con JWT. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  protected form = this.fb.nonNullable.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });
  protected verClave = signal(false);
  protected cargando = signal(false);
  protected error = signal('');

  /** Usuarios de prueba (contraseña Nido2026!) para la demostracion. */
  protected demo = [
    { login: 'admin', rol: 'Administrador' },
    { login: 'lmendoza', rol: 'Propietario' },
    { login: 'rhuaman', rol: 'Personal' },
  ];

  protected usarDemo(login: string): void {
    this.form.setValue({ login, password: 'Nido2026!' });
  }

  protected ingresar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.error.set('');
    const { login, password } = this.form.getRawValue();
    this.auth.login(login, password).subscribe({
      next: () => this.router.navigateByUrl(this.auth.rutaInicial()),
      error: (e: HttpErrorResponse) => {
        this.cargando.set(false);
        this.error.set(e.status === 0 ? 'No hay conexión con el servidor.' : (e.error?.mensaje ?? 'No se pudo iniciar sesión.'));
      },
    });
  }
}
