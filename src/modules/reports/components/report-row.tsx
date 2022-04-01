import { A } from '@mobily/ts-belt';

export type ReportRowProps = {
  index: number;
  id: string;
  author: string | undefined;
  createdAt: Date;
  columns: readonly {
    columnName: string;
    value: string | undefined;
  }[];
};

export const ReportRow = ({ index, createdAt, columns, author = '' }: ReportRowProps) => {
  const formattedCreationData = new Date(createdAt).toLocaleDateString();
  const findColumn = (columnToFind: string) => A.find(columns, ({ columnName }) => columnName === columnToFind)?.value;

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{formattedCreationData}</td>
        <td>{findColumn('Typ')}</td>
        <td></td>
        <td></td>
        <td>{findColumn('Status Sprawy')}</td>
        <td>{findColumn('Komentarz')}</td>
        <td>{findColumn('Dane kontaktowe')}</td>
        <td>{author}</td>
        {/* <td>{convertTypeToString(type)}</td>
        <td>{convertBoolToString(isRequired)}</td>
        <td>
          <EditFieldTemplate id={id} isRequired={isRequired} name={name} order={order} type={type} />
        </td>
        <td>
          <RemoveFieldTemplate id={id} />
        </td>
       */}
      </tr>
    </>
  );
};
