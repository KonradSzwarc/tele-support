import { A } from '@mobily/ts-belt';

type Row = {
  column: string;
  value: string;
}[][];

export const organizeTable = (rows: Row) => {
  const columns: string[] = [];

  rows.forEach((row) =>
    row.forEach((entry) => {
      if (entry?.column && !columns.includes(entry?.column)) columns.push(entry?.column);
    })
  );

  columns.sort();

  const organizedRows = rows.map((row) => {
    const organizedRow = A.make(columns.length, '') as string[];
    row.forEach((entry) => {
      const columnIndex = columns.indexOf(entry?.column ?? '');
      organizedRow[columnIndex] = entry?.value ?? '';
    });

    return organizedRow;
  });

  return { columns, rows: organizedRows };
};
