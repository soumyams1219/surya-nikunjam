import api from "./api";

/**
 * Get all Why Choose items
 */
export const getWhyChoose = async () => {
  const res = await api.get("/why-choose");
  return res.data;
};

/**
 * Create Why Choose item
 */
export const createWhyChoose = async (formData: FormData) => {
  const res = await api.post("/why-choose", formData);
  return res.data;
};

/**
 * Update Why Choose item
 */
export const updateWhyChoose = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(`/why-choose/${id}`, formData);
  return res.data;
};

/**
 * Delete Why Choose item
 */
export const deleteWhyChoose = async (id: string) => {
  const res = await api.delete(`/why-choose/${id}`);
  return res.data;
};

export const getWhyChooseById = async (id: string) => {
  const res = await api.get(`/why-choose/${id}`);
  return res.data;
};
export const toggleWhyChooseStatus = async (id: string) => {
  const res = await api.patch(`/why-choose/${id}/toggle`);
  return res.data;
};