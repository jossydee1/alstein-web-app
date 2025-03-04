import { StaticImageData } from "next/image";

export interface CertsProps {
  title: string;
  description: string;
  image: StaticImageData;
  download_url: string;
}
