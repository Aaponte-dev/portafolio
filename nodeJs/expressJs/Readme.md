# Product store API

This project presents some functionalities of an API Restful Stateless for an online product store, following the best development practices

## General description

### Backend

- `NodeJs` 20.11.1

- `TypeScript` 4.9.4

- `ExpressJs` 4.18

- `JWT` y `Passport` para la seguridad

- `PostgreSQL` para datos estructurados e información mas robusta

- `MongoDB` para datos de alta velocidad

### Documentation

- Swagger

### Sensitive information protection

- Bcript

### Services protection

- Jwt
- Passport

### Information validation

- Class validator
- Joi

### Functionalities

- `Products` management:

  - Registration, cancellation and modification of products..

  - Search for products by name, description and ascending order by fields.

- `User` management:

  - Register, login.

  - Creating, modifying and deleting users.

  - Search for users by name, description and ascending sorting by fields.

### Outstanding aspects

- Robust security: Implementation of `JWT` and `Passport` to protect the API.

- Scalability: Modular design and stateless RESTful architecture to facilitate horizontal and vertical scalability.

- Optimized performance: Using `PostgreSQL` and `MongoDB` to optimize query performance and data management.

- Code analysis: Using `eslint` to analyze the code and detect syntax/logical errors and possible code style improvements.

- Development environment: Implementation of `Docker` to create a reproducible and scalable development environment.

- Migrations: Entities migration and administrator user to start using the API.

  - email: <admin@mail.com>
  - Password: 123456789

- Postman: File with postman extension is included to test the API `productStore.postman_collection.json`

- Methodology: Follow-up of the Scrum methodology for agile and efficient development.

- Complete documentation: Complete API documentation with `Swagger`.

### Additional technologies

- Development Environments: `Docker`, `Docker Compose`, `Dockerfile`.
- Code analysis: `eslint`.
- Methodologies: `Scrum`.

## Technical description

### Requirements

#### Options - Description

1. In case of executing the container project, it is necessary to install `Docker`.

2. It is necessary to install `node`/`nvm` to execute the server, Mongodb and Postgresql to connect with the `Nodejs/Expressjs` server

### Execute the project

It's necessary to create an `.env` file of the `.env.example` and provide the necessary data

It's necessary to create an `dataSource.ts` file of the `dataSource.example.ts` and provide the necessary data

It's necessary to create an `docker-compose.yml` file of the `docker-compose.example.yml` and provide the necessary data

#### Options - Execution

- Docker

  ```console
  # Create all services (images/containers)
  $ docker compose up -d

  # Enter the Nodejs/Expressjs container
  $ docker compose exec expressjs /bin/sh

  # (Optional) Execute migrations
  $ npm run typeorm-migration:run

  # (Optional) Execute seders
  $ npm run typeorm-seed:run
  ```

- Local installation

  ```console
    # Install all units
    $ npm i

    # Execute the Development Server
    $ npm run dev

    # Execute the production server
    $ npm run build && npm run start
  ```

#### Eslint

```console
  # See the errors detected by Eslint
  $ npm run lint

  # Try to solve ESLINT errors
  $ npm run lint:fix
```

> Note: To see the project documentation it is necessary to execute
>
> `npm run build && npm run start`
> Enter the documentation in the URL: <localhost:3001/api/v1/doc/> taking into account the port where the server is running in this case 3001
