export interface Coupon {
  id: string | number;
  code: string;
  discountPercentage: number;
  expiryDate: string;
  minAmount?: number;
  isActive: boolean;
  usageCount?: number;
}
