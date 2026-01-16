
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  specs: {
    storage: string[];
    colors: string[];
    display: string;
    camera: string;
  };
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
