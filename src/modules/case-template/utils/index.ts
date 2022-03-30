import { A, D, N, O, pipe } from '@mobily/ts-belt';
import { FieldType } from '@prisma/client';

export const convertBoolToString = (bool: boolean) => (bool ? 'Tak' : 'Nie');

const typeStrings = {
  [FieldType.SINGLE_SELECT]: 'Lista wyboru',
  [FieldType.SHORT_TEXT]: 'Krótki tekst',
  [FieldType.OPTION]: 'Opcja',
};

export const convertTypeToString = (type: FieldType) => typeStrings[type];

export const getLastElementOrder = <T extends { order: number }>(rows: T[]) =>
  pipe(rows, A.last, O.getWithDefault({ order: 0 }), D.get('order'), O.getWithDefault(0), N.succ);
