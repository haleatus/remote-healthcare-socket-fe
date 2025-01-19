import { User } from "./user.interface";

export interface AdminApplicationSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: {
    user?: User;
    note?: string;
    requestByDoc?: boolean;
    status?: string;
    deletedAt?: string | null;
    visitDate?: string | null;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    doc?: User;
  }[];
}

export interface ApplicationSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: {
    user?: User;
    note?: string;
    requestByDoc?: boolean;
    status?: string;
    deletedAt?: string | null;
    visitDate?: string | null;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    doc?: User;
  };
}

export interface ApplicationErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
