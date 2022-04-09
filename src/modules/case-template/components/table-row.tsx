import { ActionIcon } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { FieldTemplate } from '@prisma/client';
import { ChevronsDown, ChevronsUp } from 'tabler-icons-react';
import { byOrder } from '~/utils';
import { convertBoolToString, convertTypeToString, getLastElementOrder } from '../utils';
import { AddFieldTemplate } from './add-field-template';
import { EditFieldTemplate } from './edit-field-template';
import { RemoveFieldTemplate } from './remove-field-template';
import { RowDivider } from './row-divider';

export type TableRowProps = { data: FieldTemplate[]; sequence?: string } & FieldTemplate;

export const TableRow = ({ id, isRequired, isCheckedByDefault, name, order, type, data, sequence = '' }: TableRowProps) => {
  const [isExpanded, toogleIsExpanded] = useBooleanToggle();

  const rows = data.filter(({ parentId }) => parentId === id).sort(byOrder);
  const childElementDefaultOrder = getLastElementOrder(rows);

  const sequenceToShow = sequence ? `${sequence}.${order}` : order.toString();

  return (
    <>
      <tr>
        <td>{sequenceToShow}</td>
        <td>{name}</td>
        <td>{convertTypeToString(type)}</td>
        <td>{convertBoolToString(isRequired)}</td>
        <td>{convertBoolToString(isCheckedByDefault)}</td>
        <td>
          <AddFieldTemplate parentId={id} order={childElementDefaultOrder} />
        </td>
        <td>
          <EditFieldTemplate id={id} isRequired={isRequired} isCheckedByDefault={isCheckedByDefault} name={name} order={order} type={type} />
        </td>
        <td>
          <RemoveFieldTemplate id={id} />
        </td>
        <td>
          {rows.length > 0 && (
            <ActionIcon color="blue" variant="light" onClick={() => toogleIsExpanded()} sx={{ margin: 'auto' }}>
              {isExpanded ? <ChevronsUp /> : <ChevronsDown />}
            </ActionIcon>
          )}
        </td>
      </tr>
      {isExpanded && (
        <>
          <RowDivider label={name} />
          {rows.map((fieldTemplate) => (
            <TableRow key={fieldTemplate.id} data={data} sequence={sequenceToShow} {...fieldTemplate} />
          ))}
          <RowDivider />
        </>
      )}
    </>
  );
};
