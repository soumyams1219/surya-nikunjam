import api from "./api";

//import type { SiteVisit } from "../types/siteVisit";

/**
 * Get All Site Visits
 */
export const getSiteVisits = async () => {
  const response = await api.get("/site-visits");

  return response.data;
};

/**
 * Get Single Site Visit
 */
export const getSiteVisit = async (
  id: string
) => {
  const response = await api.get(
    `/site-visits/${id}`
  );

  return response.data;
};

/**
 * Create Site Visit
 * (Public Website)
 */
export const createSiteVisit = async (
  data: {
    name: string;
    phone: string;
    email: string;
    visitDate: string;
    visitTime: string;
    message: string;
  }
) => {
  const response = await api.post(
    "/site-visits",
    data
  );

  return response.data;
};

/**
 * Update Status
 */
export const updateSiteVisitStatus = async (
  id: string,
  status: "Pending" | "Contacted"
) => {
  const response = await api.patch(
    `/site-visits/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

/**
 * Delete Site Visit
 */
export const deleteSiteVisit = async (
  id: string
) => {
  const response = await api.delete(
    `/site-visits/${id}`
  );

  return response.data;
};