import { FieldTemplate } from '@prisma/client';

const boolToString = (bool: boolean) => (bool ? 'TAK' : 'NIE');

export const TableRow = ({ id, isRequired, isVisible, name, order, type, parentId }: FieldTemplate) => {
  return (
    <tr>
      <td>{order}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{boolToString(isRequired)}</td>
      <td>{boolToString(isVisible)}</td>
    </tr>
  );
};
