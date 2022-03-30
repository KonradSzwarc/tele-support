export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;
