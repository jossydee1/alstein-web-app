export interface CertsProps {
  title?: string;
  description?: string;
  image?: string;
  download_url?: string;
}

export interface PartnerProps {
  id?: string;
  name: string;
  logo: string;
  bio: string;
  website: string;
  city: string;
  state: string;
  country: string;
  address: string;
  longitude: string;
  latitude: string;
  type: string;
  specializations: string;
  mission: string;
  incorporation_date?: string;
  support_email: string;
  institutional_email?: string;
  institution?: string;
  department?: string;
  department_head_email?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  status?: string;
  profile_id?: string;
  profile?: {
    first_name: string;
    last_name: string;
    user_avatar: string | null;
    id: string;
  };
  documents: { [key: string]: CertsProps };
}
export interface UpdatePartnerProps {
  id: string;
  name?: string;
  logo?: string;
  bio?: string;
  website?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  type?: string;
  specializations?: string;
  incorporation_date?: string;
  mission?: string;
  support_email?: string;
  institutional_email?: string;
  institution?: string;
  department?: string;
  department_head_email?: string;
}
