import api from "./api";

export const getComparisonHistory = async () => {
  const response = await api.get("/history");
  return response.data.history;
};