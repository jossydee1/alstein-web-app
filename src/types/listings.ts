import { StaticImageData } from "next/image";

export interface ListingsProps {
  name: string;
  equipment: string;
  address: string;
  count: number;
  url: string;
  ratings: number;
  images: StaticImageData[];
}
