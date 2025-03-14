// Standard API response type
export interface ApiResponseProps<T> {
  status: number;
  data: T;
  message?: string;
}

export interface SampleProps {
  userId?: string;
  email: string;
  name: string;
  timestamp: string;
}
