// NOTE: In backend, reports are written as recordings

import { User } from "./user.interface";

export interface ReportSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    problem?: string;
    solution?: string;
    status?: string;
    user?: User;
    doc?: User;
  }[];
}

export interface ReportErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
