export const matchById =
  <T extends { id: string }>(idToMatch: string) =>
  ({ id }: T) =>
    idToMatch === id;
