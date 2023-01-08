import type { MaybeNull, PersonType } from ".";
import type { TeamDetailType } from "./team";

export type PlayerType = PersonType & {
  firstName: MaybeNull<string>;
  lastName: MaybeNull<string>;
  position: MaybeNull<string>;
  shirtNumber: MaybeNull<number>;
  lastUpdated: MaybeNull<string>;
  currentTeam: MaybeNull<
    Omit<TeamDetailType, "coach" | "squad" | "staff" | "lastUpdated"> & {
      contract: MaybeNull<{
        start: MaybeNull<string>;
        until: MaybeNull<string>;
      }>;
    }
  >;
};
