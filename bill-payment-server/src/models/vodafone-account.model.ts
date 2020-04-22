import {Entity, model, property} from '@loopback/repository';

@model()
export class VodafoneAccount extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql:
    {
      "columnName": "id",
      "dataType": "INT",
      "dataLength": 2,
      "nullable": "N"
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql:
    {
      "columnName": "accountNumber",
      "dataType": "VARCHAR",
      "dataLength": 25,
      "nullable": "N"
    },
  })
  accountNumber: string;

  @property({
    type: 'string',
    mysql:
    {
      "columnName": "accountDesc",
      "dataType": "VARCHAR",
      "dataLength": 50,
      "nullable": "N"
    },
  })
  accountDesc?: string;


  constructor(data?: Partial<VodafoneAccount>) {
    super(data);
  }
}

export interface VodafoneAccountRelations {
  // describe navigational properties here
}

export type VodafoneAccountWithRelations = VodafoneAccount & VodafoneAccountRelations;
