import api from "./api";

export const getComparisonHistory = async () => {
  const response = await api.get("/history");
  return response.data.history;
};

export const deleteComparison = async (id: string) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};
