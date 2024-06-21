
## Description

Factory Digital code assignment.

### API Description

This API manages products in a store, offering CRUD operations for product management with additional features:

- **Product Management:**
  - Add, view, edit, and delete products.
  - Products can be filtered by category and sorted by price (ascending and descending).

- **User Authentication and Authorization:**
  - **Authentication:**
    - Guest users can register with their email address and password.
    - Registered users can log in using their credentials.

  - **Authorization:**
    - Product management functionalities are restricted to store owners.
    - Guest users have read-only access to view the list of products.

## Running the Database

```bash
$ docker-compose up
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Swagger UI
To interact with the API using Swagger UI:

1. Ensure the application is running and accessible.
2. Navigate to the Swagger UI endpoint in your web browser: `http://localhost:3000/api`.


