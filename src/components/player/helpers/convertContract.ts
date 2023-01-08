import { convertDate } from "@/helpers/convertDate";

const convertContract = (contract: string | null) => {
  if (contract) {
    return convertDate(contract);
  }
  return "unknown";
};

export default convertContract;
