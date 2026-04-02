export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}
