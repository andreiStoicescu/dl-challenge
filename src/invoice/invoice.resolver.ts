import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './model/invoice.model';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Mutation(() => Invoice)
  createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return this.invoiceService.create(createInvoiceInput);
  }

  @Query(() => [Invoice], { name: 'invoices' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice, { name: 'invoice' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.findOne(id);
  }

  @Mutation(() => Invoice)
  updateInvoice(
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ) {
    return this.invoiceService.update(
      updateInvoiceInput.id,
      updateInvoiceInput,
    );
  }

  @Mutation(() => Boolean)
  removeInvoice(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.remove(id);
  }

  @Mutation(() => Boolean)
  markAsPaid(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.markAsPaid(id);
  }

  @Mutation(() => Invoice)
  stornInvoice(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.stornInvoice(id);
  }
}
