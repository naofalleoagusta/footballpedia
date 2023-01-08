export type MaybeNull<T> = T | null;

export type PersonType = {
  id: number;
  name: MaybeNull<string>;
  dateOfBirth: MaybeNull<string>;
  nationality: MaybeNull<string>;
};
