import { Case } from '@prisma/client';

export type ReportRowProps = { data: Case[]; nr: number } & Case;

// export const ReportRow = ({ nr, createdAt } : ReportRowProps) => {
export const ReportRow = () => {
  return (
    <>
      <tr>
        {/* <td>{nr}</td> */}
        {/* <td>{createdAt}</td> */}
        <td>1</td>
        <td>28.03.2022</td>
        <td>Zamieszkanie</td>
        <td>1 noc</td>
        <td>2-3 osoby</td>
        <td>w toku</td>
        <td>Oddzwonic jak sie cos znajdzie w Bychawie</td>
        <td>500100200</td>
        {/* <td>{user.email}</td> */}
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
