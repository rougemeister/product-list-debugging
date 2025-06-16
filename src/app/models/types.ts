export interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export interface CartItem extends Dessert {
  quantity: number;
}