import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const createUserInputSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email('Niepoprawny format maila').nonempty('Adres mailowy jest wymagany').max(150, 'Za długi adres mailowy'),
  name: z.string().min(2, 'Za krótkie imię').max(150, 'Za długa nazwa'),
  password: z.string().min(3, 'Za krótkie hasło').max(150, 'Za długie hasło'),
  language: z.string().min(3, 'Za krótka nazwa języka').max(50, 'Za długa nazwa'),
  role: z.nativeEnum(UserRole),
});

export const updateUserInputSchema = z.object({
  id: z.string().nonempty(),
  email: z.string().email('Niepoprawny format maila').nonempty('Adres mailowy jest wymagany').max(150, 'Za długi adres mailowy'),
  name: z.string().min(2, 'Za krótkie imię').max(150, 'Za długa nazwa'),
  password: z.string().min(3, 'Za krótkie hasło').max(150, 'Za długie hasło'),
  language: z.string().min(3, 'Za krótka nazwa języka').max(50, 'Za długa nazwa'),
  role: z.nativeEnum(UserRole),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
