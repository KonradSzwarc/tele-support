import { PrismaClient } from '@prisma/client';
import { createFieldTemplates } from './models/field-templates';
import { createUsers } from './models/users';

const prisma = new PrismaClient();

async function main() {
  const users = createUsers(prisma);
  const fieldTemplates = createFieldTemplates(prisma);

  await Promise.all([users, fieldTemplates]);
}

main()
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
