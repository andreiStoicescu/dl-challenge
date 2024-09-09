import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ProjectService } from 'src/project/project.service';
import { StatusEnum, TypeEnum } from './model/enums';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
    private readonly customerService: CustomerService,
    private readonly projectService: ProjectService,
  ) { }

  findInvoiceEntity(id: number) {
    return this.invoiceRepository
      .findOne({
        where: { id },
        relations: ['customer', 'project', 'stornoInvoice'],
      })
      .then((invoiceEntity) => {
        if (invoiceEntity == null) {
          throw new NotFoundException(`Invoice with id ${id} not found`);
        }
        return invoiceEntity;
      });
  }

  async create(createInvoiceInput: CreateInvoiceInput) {
    const invoiceEntity = new InvoiceEntity();
    invoiceEntity.currency = createInvoiceInput.currency;
    invoiceEntity.amount = createInvoiceInput.amount;
    if (createInvoiceInput.dueDate < new Date()) {
      throw new Error('Due date must be in the future');
    }
    invoiceEntity.dueDate = createInvoiceInput.dueDate;
    invoiceEntity.description = createInvoiceInput.description;
    invoiceEntity.createdAt = new Date();
    invoiceEntity.customer = await this.customerService.findCustomerEntity(
      createInvoiceInput.customerId,
    );
    invoiceEntity.project = await this.projectService.findProjectEntity(
      createInvoiceInput.projectId,
    );
    return this.invoiceRepository.save(invoiceEntity);
  }

  findAll() {
    return this.invoiceRepository
      .find({
        relations: ['customer', 'project', 'stornoInvoice'],
      })
      .then((invoiceEntities) => {
        return invoiceEntities;
      });
  }

  findOne(id: number) {
    return this.findInvoiceEntity(id).then((invoiceEntity) => {
      return invoiceEntity;
    });
  }

  async update(id: number, updateInvoiceInput: UpdateInvoiceInput) {
    const invoiceEntity = await this.invoiceRepository.findOneBy({ id });

    if (updateInvoiceInput.currency) {
      invoiceEntity.currency = updateInvoiceInput.currency;
    }
    if (updateInvoiceInput.amount) {
      invoiceEntity.amount = updateInvoiceInput.amount;
    }
    if (updateInvoiceInput.dueDate) {
      if (updateInvoiceInput.dueDate < new Date()) {
        throw new Error('Due date must be in the future');
      }
      invoiceEntity.dueDate = updateInvoiceInput.dueDate;
    }
    if (updateInvoiceInput.description) {
      invoiceEntity.description = updateInvoiceInput.description;
    }
    invoiceEntity.updatedAt = new Date();
    if (updateInvoiceInput.customerId) {
      invoiceEntity.customer = await this.customerService.findCustomerEntity(
        updateInvoiceInput.customerId,
      );
    }
    if (updateInvoiceInput.projectId) {
      invoiceEntity.project = await this.projectService.findProjectEntity(
        updateInvoiceInput.projectId,
      );
    }
    return this.invoiceRepository.save(invoiceEntity);
  }

  async remove(id: number) {
    await this.findInvoiceEntity(id);

    const result = await this.invoiceRepository.delete({ id });
    return result.affected === 1;
  }

  async markAsPaid(id: number) {
    const invoiceEntity = await this.findInvoiceEntity(id);
    if (invoiceEntity.status === StatusEnum.STORNO) {
      throw new Error('Invoice is already storno');
    }
    if (invoiceEntity.type === TypeEnum.STORNO) {
      throw new Error('You can not storn a storno invoice');
    }

    invoiceEntity.status = StatusEnum.PAID;
    const result = await this.invoiceRepository.update(id, invoiceEntity);
    return result.affected === 1;
  }

  async stornInvoice(id: number) {
    const invoiceEntity = await this.findInvoiceEntity(id);

    if (invoiceEntity.status === StatusEnum.STORNO) {
      throw new Error('Invoice is already storno');
    }
    if (invoiceEntity.type === TypeEnum.STORNO) {
      throw new Error('You can not storn a storno invoice');
    }

    const stornoInvoiceEntity = new InvoiceEntity();
    stornoInvoiceEntity.currency = invoiceEntity.currency;
    stornoInvoiceEntity.amount = -invoiceEntity.amount;
    stornoInvoiceEntity.type = TypeEnum.STORNO;
    stornoInvoiceEntity.status = StatusEnum.STORNO;
    stornoInvoiceEntity.dueDate = invoiceEntity.dueDate;
    stornoInvoiceEntity.description = invoiceEntity.description;
    stornoInvoiceEntity.createdAt = new Date();
    stornoInvoiceEntity.customer = invoiceEntity.customer;
    stornoInvoiceEntity.project = invoiceEntity.project;

    const savedstornoInvoiceEntity =
      await this.invoiceRepository.save(stornoInvoiceEntity);

    invoiceEntity.status = StatusEnum.STORNO;
    invoiceEntity.stornoInvoice = savedstornoInvoiceEntity;
    await this.invoiceRepository.save(invoiceEntity);

    return savedstornoInvoiceEntity;
  }
}
