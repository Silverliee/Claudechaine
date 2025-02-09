import {Product} from "@/types/base/Products";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../shadcn/card";
import {Button} from "../shadcn/button";
import PayButtonComponent from "./payButton";
import {ShoppingCart, Eye} from "lucide-react";
import {UUIDTypes} from "uuid";

const ProductCard = ({
                         product,
                         isBtnAddToCart,
                         onProductClick,
                     }: {
    product: Product,
    isBtnAddToCart?: boolean,
    onProductClick?: () => void,
    key?: UUIDTypes
}) => {
    return (
        <Card
            className="
        group
        transition-all
        duration-300
        hover:shadow-xl
        hover:scale-105
        border-opacity-50
        hover:border-primary/50
        flex
        flex-col
        h-full
        max-w-[300px]  // Limite la largeur maximale de la carte
        mx-auto      // Centrage horizontal
      "
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold truncate">{product.name}</CardTitle>
            </CardHeader>

            <CardContent className="relative pt-2 pb-4 flex-grow">
                <div className="
          w-full
          h-48  // Hauteur fixe pour l'image
          overflow-hidden
          rounded-lg
          relative
          group-hover:opacity-80
          transition-opacity
        ">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
              w-full
              h-full
              object-cover
              object-center  // Centrage de l'image
              transition-transform
              group-hover:scale-110
            "
                    />

                    {onProductClick && (
                        <div className="
              absolute
              inset-0
              bg-black/20
              opacity-0
              group-hover:opacity-100
              transition-opacity
              flex
              items-center
              justify-center
            ">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={onProductClick}
                                className="
                  rounded-full
                  w-10
                  h-10
                  bg-white/80
                  hover:bg-white
                  transition-colors
                "
                            >
                                <Eye className="w-5 h-5"/>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="
        flex
        items-center
        justify-between
        pt-2
        border-t
        border-border/30
        mt-auto
      ">
                <CardDescription className="
          text-lg
          font-semibold
          text-primary
        ">
                    {product.price}€
                </CardDescription>

                {isBtnAddToCart && (
                    <PayButtonComponent
                        product={product}
                        variant="outline"
                        className="
              hover:bg-primary/10
              transition-colors
            "
                    >
                        <ShoppingCart className="mr-2 h-4 w-4"/>
                        Acheter
                    </PayButtonComponent>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProductCard;