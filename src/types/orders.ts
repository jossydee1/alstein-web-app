export interface OrderProps {
  id: string;
  partner_id: string;
  client_id: string;
  booking_amount: number;
  status: string;
  equipment_id: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  payment_status: string;
  partners: {
    name: string;
    logo: string;
    id: string;
  };
  client: {
    first_name: string;
    last_name: string;
    user_avatar: string | null;
    id: string;
  };
  equipment: {
    name: string;
    description: string;
    address: string;
    price: number;
    longitude: string;
    latitude: string;
    city: string;
    country: string;
    service_type: string;
    created_at: string;
    equipment_file: unknown[];
  };
}

export interface OrderHistoryProps {
  total_count: number;
  data: OrderProps[];
}
