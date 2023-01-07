import { FOOTBALL_API_BASE_URL, FOOTBALL_API_TOKEN } from "@/config";
import useFetch from "./useFetch";

type UseFetchFootballType = {
  route: string;
};

const useFetchFootball = <T>({ route }: UseFetchFootballType) => {
  const res = useFetch<T>(`${FOOTBALL_API_BASE_URL}${route}`, {
    headers: new Headers({
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-auth-token, x-response-control",
      "X-Auth-Token": FOOTBALL_API_TOKEN,
      "Content-Length": "0",
      "Content-Type": "text/plain",
    }),
  });
  return res;
};

export default useFetchFootball;
