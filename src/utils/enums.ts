const StringIsNumber = (value: any) => Number.isNaN(Number(value)) === false;

export const convertEnumToArray = <T extends Record<string, any>>(enumeration: T): T[keyof T][] =>
  Object.keys(enumeration)
    .map((key) => {
      return key;
    })
    .filter(StringIsNumber)
    .map((key) => {
      return enumeration[key];
    });
