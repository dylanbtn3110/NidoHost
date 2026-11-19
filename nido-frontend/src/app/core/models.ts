// Modelos que coinciden con el JSON de la API REST de Nido (/api/v1)

export type Rol = 'ADMIN' | 'PROPIETARIO' | 'PERSONAL';

export interface Opcion { nombre: string; ruta: string; }

/** Respuesta de POST /auth/login. */
export interface Sesion {
  token: string;
  idusuario: number;
  login: string;
  nombres: string;
  roles: Rol[];
  opciones: Opcion[];
}

export interface Ubigeo { idubigeo: number; departamento: string; provincia: string; distrito: string; }
export interface Pais { idPais: number; iso: string; nombre: string; }

export interface RolUsuario { idrol?: number; nombre: string; estado?: string; }

export interface Usuario {
  idusuario?: number;
  nombres: string;
  apellidos: string;
  dni?: string;
  login: string;
  password?: string;
  correo?: string;
  fechaRegistro?: string;
  fechaNacimiento?: string | null;
  direccion?: string | null;
  especialidad?: string | null;
  estado?: string;
  ubigeo?: Ubigeo | null;
  roles?: RolUsuario[];
}

export interface Alojamiento {
  idAlojamiento?: number;
  nombre: string;
  direccion: string;
  latitud: number | null;
  longitud: number | null;
  capacidad: number;
  precioBase: number;
  estado: string;
  idUsuario?: number;
  propietario?: Usuario;
  ubigeo?: Ubigeo | null;
}

export interface Huesped {
  idHuesped?: number;
  nombres: string;
  apellidos: string;
  correo?: string;
  telefono?: string;
  idUsuario?: number;
  consentimiento: boolean;
}

export interface Reserva {
  idReserva?: number;
  entrada: string;
  salida: string;
  canal?: string;
  precio?: number;
  moneda?: string;
  estado?: string;
  idUsuario?: number;
  alojamiento: Partial<Alojamiento>;
  huesped: Partial<Huesped>;
}

export interface Pago {
  idPago?: number;
  tipo: string;
  importe: number;
  moneda: string;
  fecha: string;
  estado: string;
  idUsuario?: number;
  reserva: Partial<Reserva>;
}

/** El checklist de un servicio viaja como texto JSON: "[{item, obligatorio, hecho}]". */
export interface ItemChecklist { item: string; obligatorio: boolean; hecho: boolean; }

export interface Servicio {
  idServicio?: number;
  tipo: string;
  inicio: string;
  fin?: string | null;
  estado?: string;
  checklist?: string | null;
  idUsuario?: number;
  alojamiento: Partial<Alojamiento>;
  reserva?: Partial<Reserva> | null;
  personal: Partial<Usuario>;
}

export interface Evidencia {
  idEvidencia: number;
  nombreArchivo: string;
  tipoArchivo: string;
  tamanio: number;
  fecha: string;
}

export interface Incidencia {
  idIncidencia?: number;
  categoria: string;
  prioridad: string;
  descripcion: string;
  estado?: string;
  idUsuario?: number;
  alojamiento: Partial<Alojamiento>;
  reserva?: Partial<Reserva> | null;
  servicio?: Partial<Servicio> | null;
}

export interface Auditoria {
  idAuditoria: number;
  usuario: string;
  fecha: string;
  entidad: string;
  operacion: string;
  idRegistro: string | null;
  detalle: string;
}

// ---- Reportes ----
export interface ReporteIngresos {
  fechaInicio: string; fechaFin: string; moneda: string;
  totalIngresos: number; totalGastos: number; neto: number; pendienteDeCobro: number;
  porAlojamiento: { idAlojamiento: number; alojamiento: string; ingresos: number; gastos: number; neto: number }[];
}

export interface ReporteOcupacion {
  fechaInicio: string; fechaFin: string; nochesDelPeriodo: number; ocupacionPromedio: number;
  porAlojamiento: { idAlojamiento: number; alojamiento: string; nochesOcupadas: number; reservas: number; ocupacion: number }[];
}

export interface EventoCalendario {
  tipo: string; id: number; idAlojamiento: number; alojamiento: string;
  inicio: string; fin: string; estado: string; detalle: string;
}

export interface ReporteOperacion {
  fechaInicio: string; fechaFin: string;
  serviciosPorEstado: Record<string, number>;
  evidencia: { completa: number; incompleta: number };
  atrasos: { cantidad: number; servicios: { idServicio: number; tipo: string; estado: string; inicio: string; fin: string }[] };
  incidenciasPorPrioridad: Record<string, number>;
}

export interface Disponibilidad {
  idAlojamiento: number; entrada: string; salida: string; disponible: boolean;
  conflictos: { idReserva: number; entrada: string; salida: string; estado: string }[];
}

export interface Geocodificacion {
  direccionConsultada: string; direccionEncontrada: string; latitud: number; longitud: number; fuente: string;
}

// ---- Inteligencia artificial (US17) ----
export interface SugerenciaIa {
  categoria: string; confianzaCategoria: number;
  prioridad: string; confianzaPrioridad: number;
  palabrasClave: string[]; modelo: string;
}

export interface ModeloIa {
  modelo: string; muestras: number; muestrasDeLaBaseDeDatos: number;
  precisionCategoria: number; precisionPrioridad: number; precisionPrioridadCercana: number;
  categorias: string[]; prioridades: string[]; entrenadoEn: string;
}
