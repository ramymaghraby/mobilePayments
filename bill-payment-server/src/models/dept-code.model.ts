import {Entity, model, property} from '@loopback/repository';

@model()
export class DeptCode extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'INT',
      dataLength: 3,
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'code',
      dataType: 'VARCHAR',
      dataLength: 25,
      nullable: 'N',
    },
  })
  code: string;

  constructor(data?: Partial<DeptCode>) {
    super(data);
  }
}

export interface DeptCodeRelations {
  // describe navigational properties here
}

export type DeptCodeWithRelations = DeptCode & DeptCodeRelations;
