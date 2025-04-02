export interface UserDetailsProps {
  first_name: string;
  last_name: string;
  email: string;
  id?: string;
  phone_number: string;
  profile_picture?: string | null;
  address?: string;
  city?: string;
  country?: string;
  occupation?: string;
  gender?: string;
}

export interface BusinessProps {
  name: string;
  address: string;
  email: string;
  phone_number: string;
  documents: Array<{ name: string; file?: File }>;
  logo: string;
}
