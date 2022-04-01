import { Container, Table } from '@mantine/core';
import { useCaseCases } from '~/modules/case/hooks';
import { ReportRow } from './report-row';

export const ReportTable = () => {
  const { data } = useCaseCases();
  console.log('🚀 ~ file: report-table.tsx ~ line 7 ~ ReportTable ~ data', data);

  return (
    <Container mt={20} size="xl">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Data</th>
            <th>Typ</th>
            <th>Typ - 2</th>
            <th>Typ - 3</th>
            <th>Status</th>
            <th>Komentarz</th>
            <th>Dane kontaktowe</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((issue, index) => (
            <ReportRow key={issue.id} index={index + 1} {...issue} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
