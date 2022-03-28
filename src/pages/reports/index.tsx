import { Container, Table } from '@mantine/core';
import { NextPage } from 'next';
import { useCaseCases } from '~/modules/case/hooks';
import { ReportRow } from '~/modules/reports/components/report-row';

const Report: NextPage = () => {
  const { data } = useCaseCases();

  console.log('report cases: ', data);
  // na podstawie case'ow zrobic wiersze tabeli
  const rows = <ReportRow />;

  return (
    <Container mt={20} size="xl">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>NR</th>
            <th>DATA</th>
            <th>POZIOM 1</th>
            <th>POZIOM 2</th>
            <th>POZIOM 3</th>
            <th>STATUS SPRAWY</th>
            <th>KOMENTARZ</th>
            <th>DANE KONTAKTOWE</th>
            <th>UŻYTKOWNIK</th>
            <th>EDYTUJ</th>
            <th>ZAPISZ</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};

export default Report;
