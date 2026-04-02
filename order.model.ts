export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  shippingAddress?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  customerName?: string; // Optional if we attach it in some cases
  items: OrderItem[];
}
