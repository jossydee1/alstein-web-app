import { StaticImageData } from "next/image";

export interface ListingsProps {
  address: string;
  availability: string;
  category_id: string;
  city: string;
  country: string;
  created_at: string;
  description: string;
  equipment_file: [];
  id: string;
  latitude: string;
  listing_status: string;
  longitude: string;
  name: string;
  partner_id: string;
  price: number;
  service_type: string;
  updated_at: string;
  images: StaticImageData[];
}

export interface ListingPartnerProps {
  id: string;
  logo: string;
  name: string;
  is_verified: boolean;
}

export interface ListingSpecificationProps {
  id: string;
  specification: string;
}

export interface ListingInfoProps extends ListingsProps {
  category: CategoryProps;
  partner: ListingPartnerProps;
  specifications: ListingSpecificationProps[];
}

export interface SubcategoryProps {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  category_id: string;
}

export interface CategoryProps {
  id: string;
  title: string;
  title_slug: string;
  image_url: string | null;
  is_publish: boolean;
  created_at: string;
  updated_at: string;
  subcategory: SubcategoryProps[];
}
