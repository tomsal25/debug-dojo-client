export const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface API_INFO {
  limit: number;
}

export interface API_DATA {
  id: number;
  code: string;
  test: string;
  summary: string;
}

export const API_DATA_ERROR_STATUS = {
  OUT: 1, // out of bounds
  INVALID: 2,
  ABORT: 3,
  OTHER: 10,
} as const;
