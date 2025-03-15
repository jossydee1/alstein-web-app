import api from "./axios";
import { API_URL } from "../others";

export async function serverFetch(url: string) {
  const res = await api.get(`${API_URL}${url}`);
  const data = await res.data;

  return data.data;
}
