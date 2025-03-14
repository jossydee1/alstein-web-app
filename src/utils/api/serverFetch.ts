import api from "./axios";
import { API_URL } from "../others";
export async function serverFetch() {
  const res = await api.get(
    `${API_URL}client/public/api/v1/equipments/get-equipment-category?skip=0&take=3`,
  );
  const data = await res.data;

  return data.data;
}
