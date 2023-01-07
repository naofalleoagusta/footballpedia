export type AreaType = {
  id: number;
  name: string;
  countryCode: string;
  flag: string | null;
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
};

export type GetAreaReturnType = {
  count: number;
  filters: Record<string, any>;
  areas: AreaType[];
};
