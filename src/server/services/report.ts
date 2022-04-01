import { A, D, pipe } from '@mobily/ts-belt';
import { prisma } from '../prisma';

export const getReport = async () => {
  const allFields = await prisma.fieldTemplate.findMany({
    include: { fields: true, parent: true, children: true },
  });

  const cases = await prisma.case.findMany({
    select: {
      id: true,
      fields: { select: { template: { select: { name: true, type: true, parent: { select: { id: true, name: true } } } }, value: true } },
      user: { select: { name: true, email: true } },
      createdAt: true,
    },
  });

  type Issue = typeof cases[number];

  const findField = (idToFind: string) => A.find(allFields, ({ id }) => id === idToFind);
  const getFieldValue = (field: Issue['fields'][number]) => {
    const fieldTemplate = findField(field.value);
    const isSelect = field.template.type === 'SINGLE_SELECT';

    return isSelect ? fieldTemplate?.name : field.value;
  };

  const handleCase = (issue: Issue) => {
    const createColumn = (field: Issue['fields'][number]) => {
      const fieldTemplate = findField(field.value);

      const value = getFieldValue(field);
      if (fieldTemplate?.children.length) {
        //TODO: Find right child and append its value to the values
        const newValue = getFieldValue(field);
      }

      const column = { columnName: field.template.name, value };

      return column;
    };

    const columns = pipe(
      issue.fields,
      A.keep((issue) => Boolean(!issue.template.parent?.id)),
      A.map(createColumn)
    );

    return { id: issue.id, columns, author: issue.user?.name, createdAt: issue.createdAt };
  };

  const table = pipe(cases, A.map(handleCase));
  console.dir(table, { depth: 5 });

  return table;
};
