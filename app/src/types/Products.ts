import { UUIDTypes } from "uuid";

export type Product = {
  id: UUIDTypes;
  name: string;
  image: string;
  price: number;
};
