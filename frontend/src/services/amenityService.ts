import api from "./api";
//import type { Amenity } from "../types/amenity";

/**
 * Get all amenities
 */
export const getAmenities = async () => {
  const response = await api.get("/amenities");

  return response.data;
};

/**
 * Get amenity by id
 */
export const getAmenity = async (
  id: string
) => {
  const response = await api.get(
    `/amenities/${id}`
  );

  return response.data;
};

/**
 * Create amenity
 */
export const createAmenity = async (
  formData: FormData
) => {
  const response = await api.post(
    "/amenities",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Update amenity
 */
export const updateAmenity = async (
  id: string,
  formData: FormData
) => {
  const response = await api.put(
    `/amenities/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Delete amenity
 */
export const deleteAmenity = async (
  id: string
) => {
  const response = await api.delete(
    `/amenities/${id}`
  );

  return response.data;
};

/**
 * Toggle status
 */
export const toggleAmenityStatus =
  async (id: string) => {
    const response = await api.patch(
      `/amenities/${id}/status`
    );

    return response.data;
  };
  export const getPublicAmenities = async () => {
    const response = await api.get("/amenity");

    return response.data;
};