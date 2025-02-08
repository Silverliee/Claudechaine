"use client";
import useFetchProducts from "@/hooks/useProducts";
import ProductCard from "@/components/product";
import Link from "next/link";

export default function Page() {
  const { products } = useFetchProducts();

  return (
    <ul>
      <p>azertyuj</p>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id.toString()}>
          <ProductCard key={product.id.toString()} product={product} />
        </Link>
      ))}
    </ul>
  );
}
