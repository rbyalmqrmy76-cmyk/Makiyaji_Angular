export interface Review {
  id: number | string;
  productId: number | string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
