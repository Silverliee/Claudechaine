import { Product } from "@/types/Products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ProductCard = ({ product }: { product: Product }) => {
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
