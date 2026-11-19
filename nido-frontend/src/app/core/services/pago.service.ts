import { Injectable } from '@angular/core';
import { Pago } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class PagoService extends CrudService<Pago> {
  constructor() { super('/api/v1/pagos'); }
}
