import { prisma } from '../../prisma';
import { calculateNestingLevel } from './calculateNestingLevel';
import { convertCaseToRow } from './convertCaseToRow';
import { organizeTable } from './organizeTable';

export const getReport = async (email: string | null) => {
  const allFieldTemplates = await prisma.fieldTemplate.findMany({
    include: { parent: true, children: true },
  });
  const fieldTemplatesWithLevel = allFieldTemplates.map(calculateNestingLevel(allFieldTemplates));

  const where = email ? { user: { email } } : {};
  const allCases = await prisma.case.findMany({
    include: { user: true, fields: { include: { template: true } } },
    where,
  });

  const rows = allCases.map(convertCaseToRow(fieldTemplatesWithLevel));
  const table = organizeTable(rows);

  return table;
};
