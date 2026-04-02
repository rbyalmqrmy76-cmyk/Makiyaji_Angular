export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user' | 'manager';
  token?: string;
  phone?: string;
  address?: string;
}
