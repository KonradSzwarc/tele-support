import { FieldTemplateWithLevel } from './calculateNestingLevel';
import { getDynamicColumns, SingleCase } from './getDynamicColumns';

export const convertCaseToRow = (fieldTemplatesWithLevel: FieldTemplateWithLevel[]) => (singleCase: SingleCase) => {
  const formattedCreationData = new Date(singleCase.createdAt).toLocaleDateString();

  const fixedColumns = [
    { column: 'Data stworzenia', value: formattedCreationData },
    { column: 'Autor', value: singleCase.user?.name ?? '' },
  ];

  const dynamicColumns = getDynamicColumns(singleCase, fieldTemplatesWithLevel);

  return [...fixedColumns, ...dynamicColumns];
};
