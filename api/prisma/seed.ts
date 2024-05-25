import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.device.deleteMany();

  await prisma.device.create({
    data: {
      id: 'smart-lamp',
      name: 'Lampada 1',
      status: 'inactive',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
