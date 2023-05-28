/* eslint-disable @typescript-eslint/camelcase */
import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { MobileNumber, MobileNumberWithRelations } from './mobile-number.model';

@model({
  settings: {
    foreignKeys: {
      fkReviewMobileNumberId: {
        name: 'fkReviewMobileNumberId',
        entity: 'MobileNumber',
        entityKey: 'id',
        foreignKey: 'mobileNumberId',
      },
    },
  },
})
export class Bill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      "columnName": "id",
      "dataType": "INT",
      "dataLength": 3
    }
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  month: Date;

  @property({
    type: 'number',
    dataType: "decimal",
    precision: 6,
    scale: 2,
    mysql: {
      "columnName": "intlCharge"
    },
  })
  IntlCharge: number;

  @property({
    type: 'number',
    dataType: "decimal",
    precision: 6,
    scale: 2,
    mysql: {
      "columnName": "roamCharge"
    },
  })
  RoamCharge: number;

  @property({
    type: 'number',
    dataType: "decimal",
    precision: 6,
    scale: 2,
    mysql: {
      "columnName": "totalAfterTax"
    },
  })
  TotalAfterTax: number;

  @belongsTo(() => MobileNumber)
  mobileNumberId: number;

  constructor(data?: Partial<Bill>) {
    super(data);
  }
}

export interface BillRelations {
  // describe navigational properties here
  MobileNumber?: MobileNumberWithRelations;

}

export type BillWithRelations = Bill & BillRelations;
