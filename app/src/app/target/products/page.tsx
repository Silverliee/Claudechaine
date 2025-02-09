"use client";
import useFetchProducts from "@/hooks/target/useProducts";
import ProductCard from "@/components/target/product";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { products } = useFetchProducts();

  return (
    <div className="grid grid-cols-4 gap-3">
      {products.map((product) => (
        <Link
          href={`/target/products/${product.id}`}
          key={product.id.toString()}
        >
          <ProductCard key={product.id.toString()} product={product} />
        </Link>
      ))}
    </div>
  );
}
