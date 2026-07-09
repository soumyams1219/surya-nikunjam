export interface Villa {
  _id?: string;

  title: string;

  plotSize: string;

  builtUpArea: string;

  bedrooms: number;

  bathrooms: number;

  description: string;

  image: string;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}