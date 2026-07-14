import api from "./api";

export const fetchPullRequest = async (prUrl: string) => {
  const res = await api.post("/github/pr", {
    prUrl,
  });

  return res.data.data;
};
