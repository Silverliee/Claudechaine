"use client";

import ProductCard from "@/components/product";
import useProductByUUID from "@/hooks/useProductById";
import { use } from "react";

function addToCart() {
  alert("ezdujhyk");
}

export default function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const resolvedParams = use(params);
  const product = useProductByUUID(resolvedParams.uuid);
  return (
    <div>
      {product && (
        <ProductCard
          key={resolvedParams.uuid}
          product={product}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}
