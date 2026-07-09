export interface LocationAdvantage {
  _id?: string;

  title: string;

  description: string;

  nearby: string[];

  isActive: boolean;
}

export interface LocationAdvantageResponse {
  success: boolean;

  message?: string;

  locationAdvantage: LocationAdvantage | null;
}