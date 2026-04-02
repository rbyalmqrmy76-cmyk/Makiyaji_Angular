export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  brand?: string;
  stockQuantity: number;
  categoryId: number;
  categoryName: string;
  userId: number;
  averageRating: number;
  totalSales: number;
  isActive: boolean;
  images: string[];
}
