export interface Amenity {
  _id?: string;

  title: string;

  description: string;

  image: string;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}