import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../src/modules/auth/password';

const adminUser = { email: 'krzysztof@jarzyna.com', language: 'Polish', name: 'Krzysztof Jarzyna', role: 'ADMIN' as const };
const regularUser = { email: 'john.smith@gmail.com', language: 'Ukrainian', name: 'John Smith', role: 'USER' as const };

export const createUsers = async (prisma: PrismaClient) => {
  const password = await encryptPassword('Dupa1');
  await prisma.user.create({ data: { ...adminUser, password } });
  await prisma.user.create({ data: { ...regularUser, password } });
};
