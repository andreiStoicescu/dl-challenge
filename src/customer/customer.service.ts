import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerEntity } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) { }

  findCustomerEntity(id: number) {
    return this.customerRepository.findOneBy({ id }).then((customerEntity) => {
      if (customerEntity == null) {
        throw new NotFoundException(`Customer with id ${id} not found`);
      }
      return customerEntity;
    });
  }

  create(createCustomerInput: CreateCustomerInput) {
    const customerEntity = new CustomerEntity();
    customerEntity.name = createCustomerInput.name;
    customerEntity.email = createCustomerInput.email;
    customerEntity.cif = createCustomerInput.cif;
    customerEntity.iban = createCustomerInput.iban;

    return this.customerRepository.save(customerEntity);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.findCustomerEntity(id);
  }

  async update(id: number, updateCustomerInput: UpdateCustomerInput) {
    const customerEntity = await this.findCustomerEntity(id);
    if (updateCustomerInput.name) {
      customerEntity.name = updateCustomerInput.name;
    }
    if (updateCustomerInput.email) {
      customerEntity.email = updateCustomerInput.email;
    }
    if (updateCustomerInput.cif) {
      customerEntity.cif = updateCustomerInput.cif;
    }
    if (updateCustomerInput.iban) {
      customerEntity.iban = updateCustomerInput.iban;
    }

    return this.customerRepository.save(customerEntity);
  }

  async remove(id: number) {
    const customerEntity = await this.customerRepository
      .findOne({
        where: { id },
        relations: ['invoices'],
      })
      .then((customerEntity) => {
        if (customerEntity == null) {
          throw new NotFoundException(`Customer with id ${id} not found`);
        }
        return customerEntity;
      });

    if (customerEntity.invoices.length > 0) {
      throw new NotAcceptableException(
        'You cannot delete a customer with invoices',
      );
    }
    const result = await this.customerRepository.delete({ id });
    return result.affected === 1;
  }
}
