import api from "./api";

export const getTestimonials = async () => {
  const res = await api.get("/testimonials");
  return res.data;
};

export const getTestimonialById = async (
  id: string
) => {
  const res = await api.get(
    `/testimonials/${id}`
  );

  return res.data;
};

export const createTestimonial = async (
  formData: FormData
) => {
  const res = await api.post(
    "/testimonials",
    formData
  );

  return res.data;
};

export const updateTestimonial = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(
    `/testimonials/${id}`,
    formData
  );

  return res.data;
};

export const deleteTestimonial = async (
  id: string
) => {
  const res = await api.delete(
    `/testimonials/${id}`
  );

  return res.data;
};

export const toggleTestimonialStatus =
  async (id: string) => {
    const res = await api.patch(
      `/testimonials/${id}/toggle`
    );

    return res.data;
  };