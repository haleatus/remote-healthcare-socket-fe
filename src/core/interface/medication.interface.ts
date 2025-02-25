export interface IMedication {
  id: number;
  name: string;
  description: string;
  dosage: string;
  frequency: string;
  expirationDate: string;
  duration: string;
  docId: number;
  userId: number;
  recordId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationSuccessResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  data: IMedication[];
}

export interface MedicationErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error: Record<string, string>;
  data: Record<string, never>;
}
