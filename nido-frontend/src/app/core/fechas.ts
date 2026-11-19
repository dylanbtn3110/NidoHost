// Utilidades de fecha: la API usa yyyy-MM-dd (reportes) y yyyy-MM-ddTHH:mm:ss (reservas, pagos, servicios).

const dos = (n: number) => String(n).padStart(2, '0');

/** yyyy-MM-dd en hora local. */
export function aFecha(fecha: Date): string {
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
}

export function primerDiaDelMes(fecha = new Date()): Date {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 1);
}

export function ultimoDiaDelMes(fecha = new Date()): Date {
  return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
}

/** De "2026-10-10T14:00:00" a "2026-10-10T14:00", el formato de <input type="datetime-local">. */
export function aCampoFechaHora(iso?: string | null): string {
  return iso ? iso.substring(0, 16) : '';
}

/** De "2026-10-10T14:00" (campo del formulario) a "2026-10-10T14:00:00" (API). */
export function aFechaHoraApi(valor: string): string {
  return valor.length === 16 ? `${valor}:00` : valor;
}

/** Ahora, en el formato de <input type="datetime-local">. */
export function ahoraComoCampo(): string {
  const f = new Date();
  return `${aFecha(f)}T${dos(f.getHours())}:${dos(f.getMinutes())}`;
}
