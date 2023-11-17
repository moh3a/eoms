# Enhanced Order Management System

## Getting Started

- Create a `.env` file;
- Copy `.env.example` into `.env` and fill in the required fields for the Postgres database connection;
- Start the server

```sh
pnpm start
# or npm start
```

- Server should be running in `http://localhost:3000`
- While the server is running, the OpenAPI documentation can be found when navigating in a browser to `http://localhost:3000/api`

## Todo

- Implement an endpoint to search for orders by their title.
- Return a list of orders that match the search query.
- Only authenticated users should be able to create, update, and delete orders.
- Users should only be able to update and delete their own orders.
- Include meaningful comments in code.
- Implement pagination for the list of all orders endpoint to handle a large number of orders.
