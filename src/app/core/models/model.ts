export interface ImageSet {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  image: ImageSet;
  name: string;
  category: string;
  price: number;
}