import api from "./api";

import type { DashboardResponse } from "../types/dashboard";

/**
 * Get Dashboard Statistics
 */
export const getDashboardStats =
  async (): Promise<DashboardResponse> => {
    const response = await api.get(
      "/dashboard/stats"
    );

    return response.data;
  };