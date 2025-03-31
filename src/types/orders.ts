export interface OrderProps {
  id: string;
}

export interface OrderHistoryProps {
  total_count: number;
  data: OrderProps[];
}
