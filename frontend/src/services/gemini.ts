import api from "./api";

type PullRequestFile = {
  filename: string;
  patch?: string;
};

export const analyzeCode = async (
  original: string,
  modified: string,
  language: string,
) => {
  try {
    const response = await api.post("/gemini/compare", {
      code1: original,
      code2: modified,
      language,
    });

    return response.data.response;
  } catch (error) {
    console.error(error);
    return "Failed to analyze code.";
  }
};

export const reviewPullRequest = async (files: PullRequestFile[]) => {
  const response = await api.post("/gemini/review-pr", {
    files,
  });

  return response.data.response;
};
