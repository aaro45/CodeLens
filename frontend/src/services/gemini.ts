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