import { UUIDTypes } from "uuid";
import { PurchaseType } from "./PurchaseTypeEnum";

export type Product = {
  id: UUIDTypes;
  name: string;
  image: string;
  price: number;
  purchaseType: PurchaseType;
};
