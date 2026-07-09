import api from "./api";

export const getFAQs = async () => {
  const res = await api.get("/faqs");
  return res.data;
};

export const getFAQ = async (id: string) => {
  const res = await api.get(`/faqs/${id}`);
  return res.data;
};

export const createFAQ = async (data: any) => {
  const res = await api.post("/faqs", data);
  return res.data;
};

export const updateFAQ = async (
  id: string,
  data: any
) => {
  const res = await api.put(
    `/faqs/${id}`,
    data
  );

  return res.data;
};

export const deleteFAQ = async (
  id: string
) => {
  const res = await api.delete(
    `/faqs/${id}`
  );

  return res.data;
};

export const toggleFAQStatus =
  async (id: string) => {
    const res = await api.patch(
      `/faqs/${id}/status`
    );

    return res.data;
  };