import api from "./api";

export const getActiveBanners = async () => {
  const res = await api.get("/banners/public-banners");

  return res.data;
};