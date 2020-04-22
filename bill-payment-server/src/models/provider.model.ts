import {Entity, model, property, hasMany} from '@loopback/repository';
import {MobileNumber} from './mobile-number.model';

@model()
export class Provider extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => MobileNumber)
  mobileNumbers: MobileNumber[];

  constructor(data?: Partial<Provider>) {
    super(data);
  }
}

export interface ProviderRelations {
  // describe navigational properties here
}

export type ProviderWithRelations = Provider & ProviderRelations;
