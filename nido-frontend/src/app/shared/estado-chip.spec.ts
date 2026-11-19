import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { EstadoChip } from './estado-chip';

function chip(valor: string): HTMLElement {
  const fixture = TestBed.createComponent(EstadoChip);
  fixture.componentRef.setInput('valor', valor);
  fixture.detectChanges();
  return fixture.nativeElement.querySelector('.chip-estado');
}

describe('EstadoChip', () => {
  it('pinta de verde los estados buenos', () => {
    expect(chip('CONFIRMADA').classList.contains('bueno')).toBe(true);
  });

  it('pinta de rojo las prioridades altas y reemplaza el guion bajo', () => {
    const rojo = chip('CRITICA');
    expect(rojo.classList.contains('malo')).toBe(true);
    expect(chip('EN_PROCESO').textContent).toBe('EN PROCESO');
  });

  it('usa el tono neutro para valores desconocidos', () => {
    expect(chip('OTRO_VALOR').classList.contains('neutro')).toBe(true);
  });
});
