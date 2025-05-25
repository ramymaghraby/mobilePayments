import {Model, model, property} from '@loopback/repository';

@model()
export class BillQuery extends Model {
  @property({
    type: 'date',
  })
  month?: string;

  @property({
    type: 'number',
  })
  type?: number;


  constructor(data?: Partial<BillQuery>) {
    super(data);
  }
}

export interface BillQueryRelations {
  // describe navigational properties here
}

export type BillQueryWithRelations = BillQuery & BillQueryRelations;
