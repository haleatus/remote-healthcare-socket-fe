export interface IReport {
  user: {
    id: number;
  };
  doc: {
    id: number;
  };
  problem: string;
  solution: string;
  appointment: {
    id: number;
  };
  status: string;
  deletedAt: null;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReportSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IReport;
}

export interface IGetAllReportSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IReport[];
}

export interface IReportErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
