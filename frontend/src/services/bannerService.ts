import api from "./api";

export const getAllBanners = async () => {
  const response = await api.get("/banners", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const createBanner = async (
  formData: FormData
) => {
  const response = await api.post(
    "/banners",
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteBanner = async (id: string) => {
  const response = await api.delete(`/banners/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const toggleBannerStatus = async (id: string) => {
  const response = await api.patch(
    `/banners/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};
export const getBannerById = async (id: string) => {
  const response = await api.get(`/banners/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const updateBanner = async (
  id: string,
  formData: FormData
) => {
  const response = await api.put(
    `/banners/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
