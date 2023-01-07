const FOOTBALL_API_URL = "https://api.football-data.org/v4/";

export const FOOTBALL_API_TOKEN = import.meta.env.VITE_FOOTBALL_DATA_TOKEN;
export const ENV = import.meta.env.MODE;
export const FOOTBALL_API_BASE_URL = `${
  ENV === "production" ? "" : "https://cors-anywhere.herokuapp.com/"
}${FOOTBALL_API_URL}`;
