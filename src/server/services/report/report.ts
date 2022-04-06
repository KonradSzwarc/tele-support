import { prisma } from '../../prisma';
import { calculateNestingLevel } from './calculateNestingLevel';
import { convertCaseToRow } from './convertCaseToRow';
import { organizeTable } from './organizeTable';

export const getReport = async () => {
  const allFieldTemplates = await prisma.fieldTemplate.findMany({
    include: { parent: true, children: true },
  });
  const fieldTemplatesWithLevel = allFieldTemplates.map(calculateNestingLevel(allFieldTemplates));

  const allCases = await prisma.case.findMany({ include: { user: true, fields: { include: { template: true } } } });

  const rows = allCases.map(convertCaseToRow(fieldTemplatesWithLevel));
  const table = organizeTable(rows);

  return table;
};
