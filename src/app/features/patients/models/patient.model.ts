export interface Patient {
  patientId: number;
  documentType?: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt: Date;
  birthDate: string;
}

export interface CreatePatientPayload {
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email?: string;
  phoneNumber?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}