import { ActionIcon } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { FieldTemplate } from '@prisma/client';
import { ChevronsDown, ChevronsUp, Trash } from 'tabler-icons-react';
import { convertBoolToString, convertTypeToString } from '../utils';
import { EditFieldTemplate } from './edit-field-template';
import { RowDivider } from './row-divider';

export type TableRowProps = { data: FieldTemplate[] } & FieldTemplate;

export const TableRow = ({ id, isRequired, name, order, type, data }: TableRowProps) => {
  const [isExpanded, toogleIsExpanded] = useBooleanToggle();

  const rows = data.filter(({ parentId }) => parentId === id);

  return (
    <>
      <tr>
        <td>{order}</td>
        <td>{name}</td>
        <td>{convertTypeToString(type)}</td>
        <td>{convertBoolToString(isRequired)}</td>
        <td>
          <EditFieldTemplate id={id} isRequired={isRequired} name={name} order={order} type={type} />
        </td>
        <td>
          <ActionIcon color="red" variant="light">
            <Trash />
          </ActionIcon>
        </td>
        <td>
          {rows.length > 0 && (
            <ActionIcon color="blue" variant="light" onClick={() => toogleIsExpanded()}>
              {isExpanded ? <ChevronsUp /> : <ChevronsDown />}
            </ActionIcon>
          )}
        </td>
      </tr>
      {isExpanded && (
        <>
          <RowDivider label={name} />
          {rows.map((fieldTemplate) => (
            <TableRow key={fieldTemplate.id} data={data} {...fieldTemplate} />
          ))}
          <RowDivider />
        </>
      )}
    </>
  );
};
