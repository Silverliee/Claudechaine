"use client";
import React from "react";
import useProductByUUID from "@/hooks/base/useProductById";
import { use } from "react";
import ProductCard from "@/components/base/product";

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
          isBtnAddToCart={true}
        />
      )}
    </div>
  );
}
