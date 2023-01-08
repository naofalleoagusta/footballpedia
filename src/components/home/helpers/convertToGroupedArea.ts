import convertDataList from "@helpers/convertDataList";
import type { AreaType } from "@/types/area";

const convertToGroupedAreas = (areas: AreaType[] | null) => {
  return convertDataList<AreaType>(areas, (area) => {
    if (!area.parentArea || area.parentArea === "World") {
      return;
    }
  });
};

export default convertToGroupedAreas;
