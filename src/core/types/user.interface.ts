export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  isVerified: boolean;
  isOnline: boolean;
  avatar: string | null;
  isAdmin: boolean;
}
