import { StaticImageData } from "next/image";

export interface ListingsProps {
  name: string;
  equipment: string;
  address: string;
  count: number;
  id: string;
  ratings: number;
  images: StaticImageData[];
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
