import { PrismaClient } from '@prisma/client';

const shortText = (name: string) => ({ name, type: 'SHORT_TEXT' as const });

export const createFieldTemplates = async (prisma: PrismaClient) => {
  const language = prisma.fieldTemplate.create({
    data: {
      name: 'Język rozmowy',
      type: 'SINGLE_SELECT',
      children: { createMany: { data: [shortText('Ukraiński'), shortText('Polski')] } },
    },
  });

  const status = prisma.fieldTemplate.create({
    data: {
      name: 'Status Sprawy',
      type: 'SINGLE_SELECT',
      children: {
        createMany: {
          data: [shortText('Zakończona'), shortText('Nierozwiązywalna'), shortText('W toku'), shortText('Anulowana')],
        },
      },
    },
  });

  const comment = prisma.fieldTemplate.create({
    data: shortText('Komentarz'),
  });

  const contactInfo = prisma.fieldTemplate.create({
    data: shortText('Dane kontaktowe'),
  });

  const transit = prisma.fieldTemplate.create({
    data: {
      name: 'Transport',
      type: 'SINGLE_SELECT',
      children: {
        createMany: {
          data: [shortText('Po Lublinie'), shortText('Z granicy'), shortText('Międzynarodowy'), shortText('Inne')],
        },
      },
    },
  });

  const medicalSupport = prisma.fieldTemplate.create({
    data: {
      name: 'Pomoc medyczna',
      type: 'SINGLE_SELECT',
      children: {
        createMany: {
          data: [shortText('Lekarz specjalista'), shortText('Lekarz rodzinny'), shortText('Inne')],
        },
      },
    },
  });

  return Promise.all([language, status, comment, contactInfo, transit, medicalSupport]);
};
