import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const source = new DataSource({
  type: (process.env.DB_TYPE as any) ?? 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) ?? 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

export default source;
