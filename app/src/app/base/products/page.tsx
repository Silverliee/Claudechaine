"use client";
import useFetchProducts from "@/hooks/useProducts";
import ProductCard from "@/components/product";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { products } = useFetchProducts();

  return (
    <ul>
      {products.map((product) => (
        <Link href={`/base/products/${product.id}`} key={product.id.toString()}>
          <ProductCard key={product.id.toString()} product={product} />
        </Link>
      ))}
    </ul>
  );
}
