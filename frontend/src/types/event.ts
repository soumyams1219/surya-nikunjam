export interface Event {
  _id?: string;

  title: string;

  shortDescription: string;

  description: string;

  image: string;

  eventDate: string;

  eventTime: string;

  location: string;

  featured: boolean;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}