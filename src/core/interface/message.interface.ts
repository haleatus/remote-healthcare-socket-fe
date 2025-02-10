export interface IMessage {
  id: number;
  updatedAt: string;
  content: string;
  createdAt: string;
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
