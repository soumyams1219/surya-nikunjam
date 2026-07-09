export interface SiteVisit {
  _id: string;

  name: string;

  phone: string;

  email: string;

  visitDate: string;

  visitTime: string;

  message: string;

  status: "Pending" | "Contacted";

  createdAt: string;

  updatedAt: string;
}