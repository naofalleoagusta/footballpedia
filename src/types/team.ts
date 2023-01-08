import type { MaybeNull, PersonType } from ".";
import type { AreaType } from "./area";

export type ListTeamType = {
  id: number;
  name: string;
  shortName: MaybeNull<string>;
  tla: MaybeNull<string>;
  crest: MaybeNull<string>;
  address: MaybeNull<string>;
  website: MaybeNull<string>;
  founded: MaybeNull<string>;
  clubColors: MaybeNull<string>;
  venue: MaybeNull<string>;
  lastUpdated: MaybeNull<string>;
  icon: MaybeNull<string>;
};

export type GetListTeamType = {
  count: number;
  filters: Record<string, unknown>;
  teams: ListTeamType[];
};

export type TeamDetailType = {
  area: Pick<AreaType, "id" | "name" | "flag"> & { code: MaybeNull<string> };
  id: number;
  name: MaybeNull<string>;
  shortName: MaybeNull<string>;
  tla: MaybeNull<string>;
  crest: MaybeNull<string>;
  address: MaybeNull<string>;
  website: MaybeNull<string>;
  founded: MaybeNull<number>;
  clubColors: MaybeNull<string>;
  venue: MaybeNull<string>;
  runningCompetitions: MaybeNull<CompetitionType[]>;
  coach: MaybeNull<
    PersonType & {
      firstName: MaybeNull<string>;
      lastName: MaybeNull<string>;
      contract: {
        start: MaybeNull<string>;
        until: MaybeNull<string>;
      };
    }
  >;
  squad: MaybeNull<SquadType[]>;
  staff: MaybeNull<PersonType[]>;
  lastUpdated: MaybeNull<string>;
};

export type CompetitionType = {
  id: number;
  name: MaybeNull<string>;
  code: MaybeNull<string>;
  type: MaybeNull<string>;
  emblem: MaybeNull<string>;
};

export type SquadType = PersonType & {
  position: "Goalkeeper" | "Defence" | "Midfield" | "Offence";
};
