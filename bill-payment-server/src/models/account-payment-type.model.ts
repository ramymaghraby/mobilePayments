import {Entity, model, property} from '@loopback/repository';

@model()
export class AccountPaymentType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'type',
      dataType: 'VARCHAR',
      dataLength: 20,
      nullable: 'N',
    },
  })
  type: string;

  constructor(data?: Partial<AccountPaymentType>) {
    super(data);
  }
}

export interface AccountPaymentTypeRelations {
  // describe navigational properties here
}

export type AccountPaymentTypeWithRelations = AccountPaymentType &
  AccountPaymentTypeRelations;
