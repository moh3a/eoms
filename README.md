# Enhanced Order Management System

## Getting Started

- Create a `.env` file;
- Copy `.env.example` into `.env` and fill in the required fields for the database connection. By default, SQLite is used, if you want to change it, provide the connection URL in `.env` and change `provider` field in `./prisma/schema.prisma` accordingly;
- Generate a JWT secret by running and add it to `.env`

```sh
openssl rand -base64 32
```

- Run the migration, seed your database and build by running

```sh
pnpm install
pnpm migrate
pnpm build
```

- Start the server

```sh
pnpm start
# or npm run start
```

- Server should be running in `http://localhost:3000`
- While the server is running, the OpenAPI documentation can be found when navigating in a browser to `http://localhost:3000/docs`
