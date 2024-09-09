import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { Initial1724930992671 } from 'migrations/1724930992671-initial';

config({ path: '.env' });

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: (process.env.DB_TYPE as any) ?? 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) ?? 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [InvoiceEntity, ProjectEntity, CustomerEntity],
  migrations: [Initial1724930992671],
};

const source = new DataSource(dataSourceOptions as DataSourceOptions);
export default source;
