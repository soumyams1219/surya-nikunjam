import api from "./api";

export const getLifestyles = async () => {
  const res = await api.get("/lifestyle");
  return res.data;
};

export const getLifestyle = async (id: string) => {
  const res = await api.get(`/lifestyle/${id}`);
  return res.data;
};

export const createLifestyle = async (
  formData: FormData
) => {
  const res = await api.post(
    "/lifestyle",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const updateLifestyle = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(
    `/lifestyle/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteLifestyle = async (
  id: string
) => {
  const res = await api.delete(
    `/lifestyle/${id}`
  );

  return res.data;
};

export const toggleLifestyleStatus =
  async (id: string) => {
    const res = await api.patch(
      `/lifestyle/${id}/status`
    );

    return res.data;
  };
  /**
 * Public Lifestyle List
 */
export const getPublicLifestyles =
  async () => {
    const response =
      await api.get("/lifestyles");

    return response.data;
  };