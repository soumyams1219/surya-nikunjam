import api from "./api";

export const getVillas = async () => {
  const res = await api.get("/villas");
  return res.data;
};

export const getVilla = async (id: string) => {
  const res = await api.get(`/villas/${id}`);
  return res.data;
};

export const createVilla = async (
  formData: FormData
) => {
  const res = await api.post(
    "/villas",
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

export const updateVilla = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(
    `/villas/${id}`,
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

export const deleteVilla = async (
  id: string
) => {
  const res = await api.delete(
    `/villas/${id}`
  );

  return res.data;
};

export const toggleVillaStatus =
  async (id: string) => {
    const res = await api.patch(
      `/villas/${id}/status`
    );

    return res.data;
  };
  /**
 * Public Villas
 */
export const getPublicVillas = async () => {
  const response = await api.get("/villas");

  return response.data;
};

/**
 * Public Villa Details
 */
export const getPublicVilla = async (
  id: string
) => {
  const response = await api.get(
    `/villas/${id}`
  );

  return response.data;
};