import type { MaybeNull } from ".";

export type AreaType = {
  id: number;
  name: string;
  countryCode: string;
  flag: MaybeNull<string>;
  parentAreaId: number | null;
  parentArea:
    | "World"
    | "Asia"
    | "Europe"
    | "Africa"
    | "Oceania"
    | "N/C America"
    | "South America"
    | null;
  icon: MaybeNull<string>;
};

export type GetAreaReturnType = {
  count: number;
  filters: Record<string, any>;
  areas: AreaType[];
};

export type GetAreaDetailType = AreaType & {
  childAreas: AreaType[];
};
