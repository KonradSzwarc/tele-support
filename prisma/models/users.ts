import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../src/pages/api/auth/password';

const adminUser = { email: 'krzysztof@jarzyna.com', language: 'Polish', name: 'Krzysztof Jarzyna', role: 'ADMIN' as const };

export const createUsers = async (prisma: PrismaClient) => {
  const password = await encryptPassword('Dupa1');
  await prisma.user.create({ data: { ...adminUser, password } });
};
