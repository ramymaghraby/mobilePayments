import { Entity, model, property, hasMany } from '@loopback/repository';
import { ExtraPackage, ExtraPackageWithRelations } from './extra-package.model';

@model()
export class InternetPackage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'INT',
      dataLength: 3,
      nullable: 'N',
    },
  })
  id?: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'MiPackageName',
      dataType: 'VARCHAR',
      dataLength: 100,
      nullable: 'N',
    },
  })
  name?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'MiPackagePrice',
      dataType: 'INT',
      dataLength: 4,
      nullable: 'N',
    },
  })
  price?: number;

  @hasMany(() => ExtraPackage)
  extraPackages: ExtraPackage[];

  constructor(data?: Partial<InternetPackage>) {
    super(data);
  }
}

export interface InternetPackageRelations {
  // describe navigational properties here
  ExtraPackage?: ExtraPackageWithRelations[];
}

export type InternetPackageWithRelations = InternetPackage &
  InternetPackageRelations;
