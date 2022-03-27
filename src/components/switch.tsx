import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core';

export type SwitchProps = { value: boolean } & MantineSwitchProps;

export const Switch = ({ value, ...props }: SwitchProps) => {
  return <MantineSwitch checked={value} {...props} />;
};
