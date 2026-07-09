import api from "./api";

import type {
  LocationAdvantage,
  LocationAdvantageResponse,
} from "../types/locationAdvantage";

/**
 * Get Location Advantage
 */
export const getLocationAdvantage =
  async (): Promise<LocationAdvantageResponse> => {
    const response = await api.get(
      "/location-advantage"
    );

    return response.data;
  };

/**
 * Save Location Advantage
 */
export const saveLocationAdvantage =
  async (
    data: Omit<LocationAdvantage, "_id">
  ): Promise<LocationAdvantageResponse> => {
    const response = await api.put(
      "/location-advantage",
      data
    );

    return response.data;
  };