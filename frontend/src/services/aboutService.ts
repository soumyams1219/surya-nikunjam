import api from "./api";
import type { About } from "../types/about";

/**
 * Get About Content
 */
export const getAbout = async (): Promise<{
  success: boolean;
  about: About;
}> => {
  const response = await api.get("/about");

  return response.data;
};

/**
 * Save About Content
 */
export const saveAbout = async (
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  about: About;
}> => {
  const response = await api.put(
    "/about",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};