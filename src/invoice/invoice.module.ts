import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ProjectService } from 'src/project/project.service';
import { CustomerModule } from 'src/customer/customer.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    CustomerModule,
    ProjectModule,
    TypeOrmModule.forFeature([InvoiceEntity, ProjectEntity, CustomerEntity]),
  ],
  providers: [InvoiceResolver, InvoiceService, CustomerService, ProjectService],
})
export class InvoiceModule {}
