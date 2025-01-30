export interface IDoctor {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  isOnline: boolean;
  avatar: string | null;
  createdAt: string;
  isAdmin: boolean;
}

export interface IDoctorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IDoctor[];
}

export interface IDoctorErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
