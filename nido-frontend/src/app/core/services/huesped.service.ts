import { Injectable } from '@angular/core';
import { Huesped } from '../models';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class HuespedService extends CrudService<Huesped> {
  constructor() { super('/api/v1/huespedes'); }
}
