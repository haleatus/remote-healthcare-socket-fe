// NOTE: In backend, reports are written as recordings

import { IUser } from "./user.interface";

export interface Report {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  problem: string;
  solution: string;
  status: string;
  user: IUser;
  doc: IUser;
}

export interface SpecificReportResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: Report;
}

export interface ReportSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: Report[];
}

export interface ReportErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
