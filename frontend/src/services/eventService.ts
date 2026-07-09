import api from "./api";

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const getEventById = async (
  id: string
) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const createEvent = async (
  formData: FormData
) => {
  const res = await api.post(
    "/events",
    formData
  );

  return res.data;
};

export const updateEvent = async (
  id: string,
  formData: FormData
) => {
  const res = await api.put(
    `/events/${id}`,
    formData
  );

  return res.data;
};

export const deleteEvent = async (
  id: string
) => {
  const res = await api.delete(
    `/events/${id}`
  );

  return res.data;
};

export const toggleEventStatus = async (
  id: string
) => {
  const res = await api.patch(
    `/events/${id}/toggle`
  );

  return res.data;
};