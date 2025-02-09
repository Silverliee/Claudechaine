import { Base64Image } from "./Base64Image";

export type BlockchainJson = {
  name: string;
  description: string;
  discount_amount_euros: number;
  image: Base64Image;
};
