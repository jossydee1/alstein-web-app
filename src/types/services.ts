import { StaticImageData } from "next/image";

export interface ServicesProps {
  name: string;
  equipment: string;
  address: string;
  count: number;
  url: string;
  ratings: number;
  images: StaticImageData[];
}
