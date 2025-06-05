import { ListingProps } from "./listings";

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
  number_of_samples: number;
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
    email: string;
    address: string;
  };
  equipment: ListingProps;
}

export interface OrderHistoryProps {
  total_count: number;
  total_items?: number;
  data: OrderProps[];
}

export interface SampleResultProps {
  id: string;
  booking_id: string;
  sample_name: string;
  sample_type: string;
  sample_weight: number;
  pickup_location: string;
  pickup_longitude: string;
  pickup_latitude: string;
  contact_person_phone_number: string;
  pickup_date: string;
  pickup_time: string;
  delivery_type: string;
  result_file: string | null;
  created_at: string;
  updated_at: string;
}
