import { Container, Loader, Table } from '@mantine/core';
import { useCaseCases } from '~/modules/case/hooks';
import { ReportRow } from './report-row';

export const ReportTable = () => {
  const { data } = useCaseCases();
  if (!data) return <Loader />;

  const { columns, rows } = data;

  return (
    <Container mt={20} size="xl">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Nr</th>
            {columns.map((name) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <ReportRow key={index} index={index + 1} row={row} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
