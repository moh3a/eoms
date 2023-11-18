# Enhanced Order Management System

## Getting Started

- Create a `.env` file;
- Copy `.env.example` into `.env` and fill in the required fields for the database connection. By default, SQLite is used, if you want to change it, provide the connection URL in `.env` and change `provider` field in `./prisma/schema.prisma` accordingly;
- Seed your database by running

```sh
node ./prisma/seed.cjs
```

- Generate a JWT secret by running

```sh
openssl rand -base64 32
```

- Generate the appropriate types by running

```sh
npx prisma generate
```

- Start the server

```sh
pnpm start
# or npm run start
```

- Server should be running in `http://localhost:3000`
- While the server is running, the OpenAPI documentation can be found when navigating in a browser to `http://localhost:3000/docs`

## Todo

- Include meaningful comments in code.
- Fix updating orders workflow.
