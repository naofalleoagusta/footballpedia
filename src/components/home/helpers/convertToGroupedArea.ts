import type { AreaType } from "@/types/area";

const convertToGroupedAreas = (areas: AreaType[] | null) => {
  let groupedAreas = new Map<string, AreaType[]>();
  if (areas) {
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
    return Array.from(groupedAreas).flatMap((groupedArea) => [
      { id: null, name: groupedArea[0] },
      ...groupedArea[1].map((area) => ({ name: area.name, id: area.id })),
    ]);
  }
  return null;
};

export default convertToGroupedAreas;
