import { Product } from "@/types/target/Products";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/card";
import PaymentComponent from "./paymentComponent";

const ProductCard = ({
  product,
  isDetailPage,
}: {
  product: Product;
  isDetailPage?: boolean;
}) => {
  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <img src={product.image} alt={product.name} />
        </CardContent>
        <CardFooter>
          {isDetailPage && (
            <div>
              <PaymentComponent product={product} />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
