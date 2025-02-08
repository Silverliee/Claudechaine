import { Product } from "@/types/Products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

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
                <Button variant={"destructive"} onClick={onAddToCart}>
                  Ajouter au panier
                </Button>
              </a>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={onAddToCart}
              >
                Ajouter au panier
              </button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
