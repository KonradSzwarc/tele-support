import { PrismaClient } from '@prisma/client';

const shortText = (name: string, isRequired = true) => ({ name, type: 'SHORT_TEXT' as const, isRequired });
const option = (name: string) => ({ name, type: 'OPTION' as const });

export const createFieldTemplates = async (prisma: PrismaClient) => {
  const language = prisma.fieldTemplate.create({
    data: {
      name: 'Język rozmowy',
      type: 'SINGLE_SELECT',
      children: { createMany: { data: [option('Ukraiński'), option('Polski')] } },
    },
  });

  const status = prisma.fieldTemplate.create({
    data: {
      name: 'Status Sprawy',
      type: 'SINGLE_SELECT',
      children: {
        createMany: {
          data: [option('Zakończona'), option('Nierozwiązywalna'), option('W toku'), option('Anulowana')],
        },
      },
    },
  });

  const comment = prisma.fieldTemplate.create({
    data: shortText('Komentarz', false),
  });

  const contactInfo = prisma.fieldTemplate.create({
    data: shortText('Dane kontaktowe', false),
  });

  const caseType = prisma.fieldTemplate.create({
    data: {
      name: 'Typ',
      type: 'SINGLE_SELECT',
      children: {
        create: [
          {
            name: 'Transport',
            type: 'SINGLE_SELECT',
            children: {
              createMany: {
                data: [option('Po Lublinie'), option('Z granicy'), option('Międzynarodowy'), option('Inne')],
              },
            },
          },
          {
            name: 'Pomoc medyczna',
            type: 'SINGLE_SELECT',
            children: {
              createMany: {
                data: [option('Lekarz specjalista'), option('Lekarz rodzinny'), option('Inne')],
              },
            },
          },
          {
            name: 'Zamieszkanie',
            type: 'SINGLE_SELECT',
            children: {
              create: [
                {
                  name: 'Kilka dni',
                  type: 'SINGLE_SELECT',
                  children: { createMany: { data: [option('1 osoba'), option('2-3 osoby'), option('4-5 osób')] } },
                },
              ],
            },
          },
        ],
      },
    },
  });

  return Promise.all([language, status, comment, contactInfo, caseType]);
};
