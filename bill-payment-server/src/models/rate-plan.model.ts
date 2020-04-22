import {Entity, model, property} from '@loopback/repository';

@model()
export class RatePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'INT',
      dataLength: 2,
      nullable: 'N',
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'name',
      dataType: 'VARCHAR',
      dataLength: 100,
      nullable: 'N',
    },
  })
  name: string;

  constructor(data?: Partial<RatePlan>) {
    super(data);
  }
}

export interface RatePlanRelations {
  // describe navigational properties here
}

export type RatePlanWithRelations = RatePlan & RatePlanRelations;
