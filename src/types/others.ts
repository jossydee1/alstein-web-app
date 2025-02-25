export interface SampleProps {
  userId?: string;
  email: string;
  name: string;
  timestamp: string;
}

// Standard API response type
export interface ApiResponseProps<T = object> {
  status: number;
  code: string;
  name: string;
  message: string;
  data?: T;
  error?: string | object | string[];
}
