export type ReportRowProps = {
  index: number;
  row: any[];
};

export const ReportRow = ({ index, row }: ReportRowProps) => {
  return (
    <>
      <tr>
        <td>{index}</td>
        {row.map((value, key) => (
          <td key={key}>{value}</td>
        ))}
      </tr>
    </>
  );
};
