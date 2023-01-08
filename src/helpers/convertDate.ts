const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ONE_YEAR = 31536000000;

export const convertDate = (date: string | number) => {
  const tempDate = new Date(date);
  const day = tempDate.getDay() + 1;
  return `${MONTH[tempDate.getMonth()]} ${
    day < 10 ? `0${day}` : day
  }, ${tempDate.getFullYear()}`;
};

export const convertToAge = (date: string) => {
  const now = Date.now();
  const birthDate = new Date(date);
  console.log(now, birthDate.getTime());
  return Math.floor((now - birthDate.getTime()) / ONE_YEAR);
};
