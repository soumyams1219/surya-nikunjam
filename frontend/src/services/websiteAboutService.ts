import api from "./api";

export const getAbout = async () => {
  const res = await api.get("/about");

  return res.data;
};