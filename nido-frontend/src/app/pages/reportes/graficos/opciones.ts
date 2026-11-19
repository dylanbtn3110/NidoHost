import { Scale } from 'chart.js';

/** Opciones comunes de los graficos de reportes (se reutilizan en el panel y en la pantalla de reportes). */

export const soles = (n: number) =>
  'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Leyenda abajo con puntos pequeños (el componente Grafico la reemplaza si se pasa `plugins`). */
export const LEYENDA = { position: 'bottom' as const, labels: { usePointStyle: true, boxWidth: 8 } };

/** Cuadricula suave en el eje de valores y ninguna en el eje de categorias. */
export const REJILLA = { color: '#EEF2F3' };
export const SIN_REJILLA = { display: false };

/** Acorta un nombre largo para los ejes; el tooltip sigue mostrando el nombre completo. */
export function etiquetaCorta(maximo: number) {
  return function (this: Scale, valor: string | number): string {
    const texto = this.getLabelForValue(Number(valor));
    return texto.length > maximo ? texto.substring(0, maximo - 1) + '…' : texto;
  };
}

/** Texto de un estado: "EN_PROCESO" -> "EN PROCESO". */
export const sinGuiones = (texto: string) => texto.replaceAll('_', ' ');
