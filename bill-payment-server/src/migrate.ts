import {BillPaymentServerApplication} from './application';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new BillPaymentServerApplication();
  await app.boot();
  await app.migrateSchema({
    existingSchema,
    models: [
      'Branch',
      'Dept',
      'AccountPaymentType',
      'Employee',
      'RatePlan',
      'DeptCode',
      'VodafoneAccount',
      'InternetPackage',
      'MobileNumber',
      'ExtraPackage',
      'Bill',
      'Provider',
    ],
  });

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
