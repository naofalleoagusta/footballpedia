import type { DataType } from "@components/ui_palette/DataList/types";

const convertDataList = <T extends DataType>(
  datas: T[] | null,
  callback?: (data: T) => void
) => {
  let groupedDatas = new Map<string, T[]>();
  if (datas) {
    datas.sort((a, b) => (a.name < b.name ? -1 : 1));
    datas.forEach((data) => {
      if (callback) {
        callback(data);
      }
      const firstChar = data.name.charAt(0);
      const groupedData = groupedDatas.get(firstChar);
      if (groupedData) {
        groupedDatas.set(firstChar, [...groupedData, data]);
      } else {
        groupedDatas.set(firstChar, [data]);
      }
    });
    return Array.from(groupedDatas).flatMap((groupedData) => [
      { id: null, name: groupedData[0], icon: null },
      ...groupedData[1].map((area) => ({
        name: area.name,
        id: area.id,
        icon: area.icon,
      })),
    ]);
  }
  return null;
};

export default convertDataList;
