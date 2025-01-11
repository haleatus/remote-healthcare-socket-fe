import { User } from "./user.interface";

export interface AuthSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: {
    accessToken?: string;
    user?: User;
    name?: string;
    email?: string;
    password?: string;
    deletedAt?: null;
    avatar?: null;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    isVerified?: boolean;
    isOnline?: boolean;
    isAdmin?: boolean;
  };
}

export interface AuthErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
