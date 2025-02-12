import { IUser } from "./user.interface";

export interface IMessage {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: IUser;
}

export interface IMessageResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IMessage[];
}

export interface IMessageErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
