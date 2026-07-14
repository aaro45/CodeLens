import api from "./api";

export const analyzeCode = async (
  original: string,
  modified: string,
  language: string
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
export const reviewPullRequest = async (files: any[]) => {
  console.log("Calling /gemini/review-pr");

  const response = await api.post("/gemini/review-pr", {
    files,
  });

  console.log(response);

  return response.data.response;
};