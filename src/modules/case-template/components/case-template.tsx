import { Container, Table } from '@mantine/core';
import { ReportRow } from '~/modules/reports/components/report-row';
import { useTemplateFields } from '../hooks';
import { AddFieldTemplate } from './add-field-template';
import { TableRow } from './table-row';

export const CaseTemplate = () => {
  const { data } = useTemplateFields();
  const rows = data?.filter(({ parentId }) => !parentId) ?? [];

  return (
    <Container mt={20}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Lp</th>
            <th>Nazwa</th>
            <th>Typ</th>
            <th>Pole wymagane</th>
            <th>Edytuj</th>
            <th>Usuń</th>
            <th>Rozwiń</th>
          </tr>
        </thead>
        <tbody>
          <ReportRow />
        </tbody>
      </Table>
    </Container>
  );
};
