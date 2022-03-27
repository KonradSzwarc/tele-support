import { Divider } from '@mantine/core';

//TODO: Fix this to be calculated
export const columnsInTheTable = 8;

export type RowDividerProps = {
  label?: string;
};

export const RowDivider = ({ label = '' }: RowDividerProps) => (
  <tr style={{ backgroundColor: 'transparent' }}>
    <td colSpan={columnsInTheTable}>
      <Divider my="xs" labelPosition="center" label={label} />
    </td>
  </tr>
);
