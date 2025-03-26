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

export interface ReviewProps {
  id: string;
  reviews: string;
  title: string;
  is_publish: boolean;
  created_at: string;
  updated_at: string;
  profile_id: string;
  user: {
    first_name: string;
    last_name: string;
    user_avatar: string;
  };
  occupation: string;
}

export interface CommentProps {
  id: string;
  comments: string;
  created_at: string;
  updated_at: string;
  partner_id: string;
  equipment_id: string;
  profile_id: string;
  partners: {
    id: string;
    name: string;
    logo: string;
  };
  profiles: {
    first_name: string;
    last_name: string;
    user_avatar: string;
  };
}
