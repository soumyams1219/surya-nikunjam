export interface Gallery {
  _id?: string;

  title: string;

  category: string;

  image: string;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}