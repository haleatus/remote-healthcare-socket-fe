import { IUser } from "./user.interface";

export interface IApplication {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  note: string;
  visitDate: string | null;
  requestByDoc: boolean;
  user: IUser;
  doc: IUser;
}

export interface ApplicationSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IApplication[];
}

export interface DoctorApplicationSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: {
    records?: [];
    user?: {
      id: number;
    };
    doc?: {
      id: number;
    };
    note?: string;
    visitDate?: string | null;
    requestByDoc?: boolean;
    status?: string;
    deletedAt?: string | null;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  }[];
}

export interface ApplicationErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
