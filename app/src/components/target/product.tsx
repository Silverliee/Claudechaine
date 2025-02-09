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

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart?: () => void;
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
          <CardDescription>{product.price}</CardDescription>
          {onAddToCart && (
            <div>
              <a href="#">
                {/* <Button variant={"destructive"} onClick={onAddToCart}>
                  Ajouter au panier
                </Button> */}
                {/* <PayButtonComponent product={product} /> */}
              </a>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
