export interface Banner {
  _id?: string;

  title: string;
  subtitle: string;
  description: string;

  image: string;

  buttonText: string;
  buttonLink: string;

  order: number;

  isActive: boolean;
}