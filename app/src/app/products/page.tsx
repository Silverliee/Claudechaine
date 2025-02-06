"use client";
import useFetchProducts from "@/hooks/useProducts";
import ProductCard from "@/components/product";


export default function ProductList() {
  const { products } = useFetchProducts();

  return (
    <ul>
        <p>azertyuj</p>
        {products.map((product) => (
            <ProductCard key={product.id.toString()} product={product} />
        ))}
    </ul>
  );
}
