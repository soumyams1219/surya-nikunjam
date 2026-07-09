import api from "./api";

export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data;
};

export const getGalleryById = async (
  id: string
) => {
  const res = await api.get(`/gallery/${id}`);
  return res.data;
};

export const createGallery = async (
  formData: FormData
) => {
  const res = await api.post(
    "/gallery",
    formData
  );

  return res.data;
};

export const updateGallery = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(
    `/gallery/${id}`,
    formData
  );

  return res.data;
};

export const deleteGallery = async (
  id: string
) => {
  const res = await api.delete(
    `/gallery/${id}`
  );

  return res.data;
};

export const toggleGalleryStatus =
  async (id: string) => {
    const res = await api.patch(
      `/gallery/${id}/toggle`
    );

    return res.data;
  };
export const getGalleries = async () => {
    const response = await api.get("/gallery");
    return response.data;
};