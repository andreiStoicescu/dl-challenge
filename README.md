<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Docker
```bash
  # Build and run the docker container
  $ docker-compose up -d --build
```
##
 

# Development Setup

## Project setup

```bash
$ yarn install
```

## Database setup

```bash
# Edit the .env file to set the database connection
# Run the following command for migrations
$ yarn run typeorm migration:run -- -d ./src/config/databaseConfig.ts
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
# GraphQL API
## Query

## Get all projects
```graphql
query {
  projects {
    id
    name
  }
}
```
## Get a project by ID
```graphql
query {
  project(id: 1) {
    id
    name
  }
}
```

## Get all customers
```graphql
query {
  customers {
    id
    name
    email
    cif
    iban
  }
}
```

## Get a customer by ID
```graphql
query {
  customer(id: 1) {
    id
    name
    email
    cif
    iban
  }
}
```

## Get all invoices
```graphql
query {
  invoices {
    id
    invoiceNumber
    amount
    currency
    status
    type
    dueDate
    description
    project {
      id
      name
    }
    customer {
      id
      name
      email
      cif
      iban
    }
    stornoInvoice {
      id
      invoiceNumber
    }
  }
}
```

## Get an invoice by ID
```graphql
query {
  invoice(id: 1) {
    id
    invoiceNumber
    amount
    currency
    status
    type
    dueDate
    description
    project {
      id
      name
    }
    customer {
      id
      name
      email
      cif
      iban
    }
    stornoInvoice {
      id
      invoiceNumber
    }
  }
}
```

## Mutations

## Create a project
```graphql
mutation {
  createProject(createProjectInput: {
    name: "Project 1"
  }) {
    id
    name
  }
}
```

## Update a project
```graphql
mutation {
  updateProject(updateProjectInput: {
    id: 1
    name: "Project 1 Updated"
  }) {
    id
    name
  }
}
```

## Delete a project
```graphql
mutation {
  removeProject(id: 1)
}
```

## Create a customer
```graphql
mutation {
  createCustomer(createCustomerInput: {
    name: "Customer 1"
    email:"test@test.com",
    cif: "123123123"
    iban: "124125412523535"
  }) {
    id
    name
    email
    cif
    iban
  }
}
```

## Update a customer
```graphql
mutation {
  updateCustomer(updateCustomerInput: {
    id: 1
    name: "Customer 1 Updated"
  }
  ) {
    id
    name
    email
    cif
    iban
  }
}
```

## Delete a customer
```graphql
mutation {
  removeCustomer(id: 1)
}
```

## Create an invoice
```graphql
mutation {
  createInvoice(createInvoiceInput: {
    amount: 100
    currency: "EUR"
    dueDate: "2024-10-12T00:00:00"
    description: "Invoice 1"
    projectId: 1
    customerId: 1
  }) {
    id
    invoiceNumber
    amount
    currency
    status
    type
    dueDate
    description
    project {
      id
      name
    }
    customer {
      id
      name
      email
      cif
      iban
    }
    stornoInvoice {
      id
      invoiceNumber
    }
  }
}
```

## Update an invoice
```graphql
mutation {
  updateInvoice(updateInvoiceInput: {
    id: 1
    amount: 200
  }) {
    id
    invoiceNumber
    amount
    currency
    status
    type
    dueDate
    description
    project {
      id
      name
    }
    customer {
      id
      name
      email
      cif
      iban
    }
    stornoInvoice {
      id
      invoiceNumber
    }
  }
}
```

## Delete an invoice
```graphql
mutation {
  removeInvoice(id: 1)
}
```
