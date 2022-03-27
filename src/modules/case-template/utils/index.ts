import { FieldType } from '@prisma/client';

export const convertBoolToString = (bool: boolean) => (bool ? 'Tak' : 'Nie');

const typeStrings = {
  [FieldType.SINGLE_SELECT]: 'Lista wyboru',
  [FieldType.SHORT_TEXT]: 'Krótki tekst',
  [FieldType.OPTION]: 'Opcja',
};

export const convertTypeToString = (type: FieldType) => typeStrings[type];
