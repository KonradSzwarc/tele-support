import { Container, Table } from '@mantine/core';
import { useTemplateFields } from '../hooks';
import { getLastElementOrder } from '../utils';
import { AddFieldTemplate } from './add-field-template';
import { columnsInTheTable } from './row-divider';
import { TableRow } from './table-row';

export const CaseTemplate = () => {
  const { data } = useTemplateFields();
  const rows = data?.filter(({ parentId }) => !parentId) ?? [];

  const lastElementOrder = getLastElementOrder(rows);

  return (
    <Container mt={20}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Lp</th>
            <th>Nazwa</th>
            <th>Typ</th>
            <th>Pole wymagane</th>
            <th>domyślnie zaznaczone</th>
            <th style={{ textAlign: 'center' }}>Dodaj</th>
            <th style={{ textAlign: 'center' }}>Edytuj</th>
            <th style={{ textAlign: 'center' }}>Usuń</th>
            <th style={{ textAlign: 'center' }}>Rozwiń</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((fieldTemplate) => (
            <TableRow key={fieldTemplate.id} {...fieldTemplate} data={data!} />
          ))}
          <tr style={{ backgroundColor: 'transparent' }}>
            <td colSpan={columnsInTheTable}>
              <AddFieldTemplate order={lastElementOrder} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
