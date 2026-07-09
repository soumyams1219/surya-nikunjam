import api from "./api";

export const getContact = async () => {
  const res = await api.get("/contact");
  return res.data;
};

export const saveContact = async (data: any) => {
  const res = await api.put(
    "/contact",
    data
  );

  return res.data;
};