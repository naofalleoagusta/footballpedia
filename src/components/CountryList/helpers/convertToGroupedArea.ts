import type { AreaType } from "@/types/area";

export type GroupedAreaType = {
  key: string;
  areas: AreaType[];
};

const convertToGroupedAreas = (areas: AreaType[]): GroupedAreaType[] => {
  let groupedAreas = new Map<string, AreaType[]>();
  areas.forEach((area) => {
    if (!area.parentArea || area.parentArea === "World") {
      return;
    }
    const firstChar = area.name.charAt(0);
    const groupedArea = groupedAreas.get(firstChar);
    if (groupedArea) {
      groupedAreas.set(firstChar, [...groupedArea, area]);
    } else {
      groupedAreas.set(firstChar, [area]);
    }
  });
  return Array.from(groupedAreas).map((groupedArea) => ({
    key: groupedArea[0],
    areas: groupedArea[1],
  }));
};

export default convertToGroupedAreas;
