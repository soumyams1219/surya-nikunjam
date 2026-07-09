export interface DashboardStats {
  villas: number;

  whyChoose: number;

  siteVisits: number;

  testimonials: number;
}

export interface RecentSiteVisit {
  _id: string;

  name: string;

  phone: string;

  email: string;

  visitDate: string;

  visitTime: string;

  status: "Pending" | "Contacted";

  createdAt: string;
}

export interface DashboardResponse {
  success: boolean;

  stats: DashboardStats;

  recentSiteVisits: RecentSiteVisit[];
}