import { ItemChecklist } from '../../core/models';

/** El checklist llega como texto JSON (puede ser null o estar mal formado): se convierte en lista con cuidado. */
export function leerChecklist(texto?: string | null): ItemChecklist[] {
  if (!texto) { return []; }
  try {
    const lista: unknown = JSON.parse(texto);
    return Array.isArray(lista) ? (lista as ItemChecklist[]) : [];
  } catch {
    return [];
  }
}

/** Items hechos, total y porcentaje de avance del checklist. */
export function progresoChecklist(items: ItemChecklist[]): { hechos: number; total: number; porcentaje: number } {
  const hechos = items.filter(i => i.hecho).length;
  return { hechos, total: items.length, porcentaje: items.length ? Math.round((hechos / items.length) * 100) : 0 };
}
