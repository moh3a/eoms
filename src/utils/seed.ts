// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require(".");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { name: "moh3a" },
    update: {},
    create: {
      name: "moh3a",
      password: hashPassword("123456"),
      orders: {
        create: {
          title: "My very first order",
          price: 123,
          description: "Describing my very first order.",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
