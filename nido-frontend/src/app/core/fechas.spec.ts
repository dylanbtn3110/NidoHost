import { describe, expect, it } from 'vitest';
import { aCampoFechaHora, aFecha, aFechaHoraApi, primerDiaDelMes, ultimoDiaDelMes } from './fechas';

describe('fechas', () => {
  it('da formato yyyy-MM-dd en hora local', () => {
    expect(aFecha(new Date(2026, 9, 5))).toBe('2026-10-05');
  });

  it('calcula el primer y el ultimo dia del mes', () => {
    expect(aFecha(primerDiaDelMes(new Date(2026, 1, 15)))).toBe('2026-02-01');
    expect(aFecha(ultimoDiaDelMes(new Date(2026, 1, 15)))).toBe('2026-02-28');
  });

  it('convierte entre el campo datetime-local y el formato de la API', () => {
    expect(aCampoFechaHora('2026-10-10T14:00:00')).toBe('2026-10-10T14:00');
    expect(aCampoFechaHora(null)).toBe('');
    expect(aFechaHoraApi('2026-10-10T14:00')).toBe('2026-10-10T14:00:00');
  });
});
