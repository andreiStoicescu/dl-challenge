import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProjectModule } from './project/project.module';
import { InvoiceModule } from './invoice/invoice.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/databaseConfig';
import { ConfigModule } from '@nestjs/config';
import { customErrorFormat } from './utils/customErrorFormat';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    InvoiceModule,
    ProjectModule,

    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      formatError: customErrorFormat,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {}
