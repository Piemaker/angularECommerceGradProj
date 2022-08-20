export interface ProductI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export interface UserCart {
  [key: string | number]: {
    [key: string | number]: AugmentedProductI;
  };
}

export interface AugmentedProductI extends ProductI {
  count: number;
}
