import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as L from 'leaflet';
import { Alojamiento, Ubigeo, Usuario } from '../../core/models';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AuthService } from '../../core/services/auth.service';
import { CatalogoService } from '../../core/services/catalogo.service';
import { GeocodificacionService } from '../../core/services/geocodificacion.service';
import { NotificacionService } from '../../core/services/notificacion.service';
import { UsuarioService } from '../../core/services/usuario.service';

const LIMA: L.LatLngExpression = [-12.0464, -77.0428];

/** Crear o editar un alojamiento. US04: coordenadas sugeridas por la API de OpenStreetMap y ajustables en el mapa. */
@Component({
  selector: 'app-alojamiento-dialogo',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './alojamiento-dialogo.html',
  styleUrl: './alojamiento-dialogo.scss',
})
export class AlojamientoDialogo implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private servicio = inject(AlojamientoService);
  private geocodificacion = inject(GeocodificacionService);
  private aviso = inject(NotificacionService);
  private ref = inject(MatDialogRef<AlojamientoDialogo>);
  protected auth = inject(AuthService);
  protected alojamiento = inject<Alojamiento | null>(MAT_DIALOG_DATA);

  protected ubigeos = signal<Ubigeo[]>([]);
  protected propietarios = signal<Usuario[]>([]);
  protected guardando = signal(false);
  protected buscando = signal(false);
  protected encontrada = signal<{ direccion: string; fuente: string } | null>(null);

  protected form = this.fb.nonNullable.group({
    nombre: [this.alojamiento?.nombre ?? '', Validators.required],
    direccion: [this.alojamiento?.direccion ?? '', Validators.required],
    idubigeo: [this.alojamiento?.ubigeo?.idubigeo ?? null as number | null],
    capacidad: [this.alojamiento?.capacidad ?? 1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    precioBase: [this.alojamiento?.precioBase ?? 0, [Validators.required, Validators.min(0.01)]],
    estado: [this.alojamiento?.estado ?? 'DISPONIBLE', Validators.required],
    idPropietario: [this.alojamiento?.propietario?.idusuario ?? null as number | null],
    latitud: [this.alojamiento?.latitud ?? null as number | null],
    longitud: [this.alojamiento?.longitud ?? null as number | null],
  });

  private contenedorMapa = viewChild.required<ElementRef<HTMLElement>>('mapa');
  private mapa?: L.Map;
  private marcador?: L.Marker;

  constructor() {
    inject(CatalogoService).ubigeos().subscribe(lista => this.ubigeos.set(lista));
    if (this.auth.tieneRol('ADMIN')) {
      this.form.controls.idPropietario.addValidators(Validators.required);
      inject(UsuarioService).listar().subscribe(lista =>
        this.propietarios.set(lista.filter(u => u.roles?.some(r => r.nombre === 'PROPIETARIO'))));
    }
  }

  ngAfterViewInit(): void {
    const { latitud, longitud } = this.form.getRawValue();
    const tieneUbicacion = latitud !== null && longitud !== null;
    this.mapa = L.map(this.contenedorMapa().nativeElement).setView(tieneUbicacion ? [latitud, longitud] : LIMA, tieneUbicacion ? 16 : 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap',
    }).addTo(this.mapa);
    if (tieneUbicacion) { this.ponerMarcador(latitud, longitud); }
    // El dialogo se anima al abrir: se recalcula el tamaño del mapa cuando ya esta visible.
    setTimeout(() => this.mapa?.invalidateSize(), 300);
  }

  ngOnDestroy(): void {
    this.mapa?.remove();
  }

  protected distritoCompleto(u: Ubigeo): string {
    return `${u.distrito}, ${u.provincia}`;
  }

  protected obtenerDeLaDireccion(): void {
    const direccion = this.form.controls.direccion.value.trim();
    if (!direccion) {
      this.form.controls.direccion.markAsTouched();
      return;
    }
    this.buscando.set(true);
    this.geocodificacion.buscar(direccion).subscribe({
      next: r => {
        this.buscando.set(false);
        this.form.patchValue({ latitud: r.latitud, longitud: r.longitud });
        this.encontrada.set({ direccion: r.direccionEncontrada, fuente: r.fuente });
        this.ponerMarcador(r.latitud, r.longitud);
        this.mapa?.setView([r.latitud, r.longitud], 16);
      },
      error: () => this.buscando.set(false),
    });
  }

  /** Cuando se escriben las coordenadas a mano, el marcador las sigue. */
  protected coordenadasEscritas(): void {
    const { latitud, longitud } = this.form.getRawValue();
    if (latitud !== null && longitud !== null && !Number.isNaN(latitud) && !Number.isNaN(longitud)) {
      this.ponerMarcador(latitud, longitud);
      this.mapa?.setView([latitud, longitud]);
    }
  }

  private ponerMarcador(latitud: number, longitud: number): void {
    if (this.marcador) {
      this.marcador.setLatLng([latitud, longitud]);
      return;
    }
    const icono = L.divIcon({ className: 'marcador-nido', iconSize: [26, 26], iconAnchor: [13, 13] });
    this.marcador = L.marker([latitud, longitud], { draggable: true, icon: icono }).addTo(this.mapa!);
    this.marcador.on('dragend', () => {
      const p = this.marcador!.getLatLng();
      this.form.patchValue({ latitud: +p.lat.toFixed(7), longitud: +p.lng.toFixed(7) });
    });
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cuerpo: Alojamiento = {
      nombre: v.nombre.trim(),
      direccion: v.direccion.trim(),
      capacidad: v.capacidad,
      precioBase: v.precioBase,
      estado: v.estado,
      latitud: v.latitud,
      longitud: v.longitud,
      ubigeo: this.ubigeos().find(u => u.idubigeo === v.idubigeo) ?? null,
    };
    // El administrador elige al propietario; si es propietario, la API usa el del token.
    if (this.auth.tieneRol('ADMIN') && v.idPropietario !== null) {
      cuerpo.propietario = { idusuario: v.idPropietario } as Usuario;
    }
    this.guardando.set(true);
    const id = this.alojamiento?.idAlojamiento;
    const peticion = id
      ? this.servicio.actualizar(id, cuerpo)
      : this.servicio.crear({ ...cuerpo, idUsuario: this.auth.sesion()!.idusuario });
    peticion.subscribe({
      next: () => {
        this.aviso.exito(id ? 'Alojamiento actualizado' : 'Alojamiento creado');
        this.ref.close(true);
      },
      error: () => this.guardando.set(false),
    });
  }
}
