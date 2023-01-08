import convertDataList from "@helpers/convertDataList";
import type { ListTeamType } from "@/types/team";

const convertToGroupedClub = (areas: ListTeamType[] | null) => {
  return convertDataList<ListTeamType>(areas);
};

export default convertToGroupedClub;
