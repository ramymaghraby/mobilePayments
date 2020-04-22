import { Entity, model, property, belongsTo } from '@loopback/repository';
import { MobileNumber, MobileNumberWithRelations } from './mobile-number.model';
import { InternetPackage, InternetPackageWithRelations } from './internet-package.model';

@model({
  settings: {
    foreignKeys: {
      fkReviewMobilesNumberId: {
        name: 'fkReviewMobilesNumberId',
        entity: 'MobileNumber',
        entityKey: 'id',
        foreignKey: 'mobileNumberId',
      },
      fkReviewMobileInternetPackagesId: {
        name: 'fkReviewMobileInternetPackagesId',
        entity: 'InternetPackage',
        entityKey: 'id',
        foreignKey: 'internetPackageId',
      },
    },
  },
})
export class ExtraPackage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'Department',
      dataType: 'INT',
      dataLength: 4,
      nullable: 'N',
    },
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => MobileNumber)
  mobileNumberId: number;

  @belongsTo(() => InternetPackage)
  internetPackageId: number;

  constructor(data?: Partial<ExtraPackage>) {
    super(data);
  }
}

export interface ExtraPackageRelations {
  // describe navigational properties here
  MobileNumber?: MobileNumberWithRelations;
  InternetPackage?: InternetPackageWithRelations;
}

export type ExtraPackageWithRelations = ExtraPackage & ExtraPackageRelations;
