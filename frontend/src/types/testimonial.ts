export interface Testimonial {
  _id?: string;

  name: string;

  designation: string;

  message: string;

  image: string;

  rating: number;

  featured: boolean;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}