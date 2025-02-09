"use client";
import React from "react";
import useProductByUUID from "@/hooks/target/useProductById";
import { use } from "react";
import ProductCard from "@/components/target/product";

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
          isDetailPage={true}
        />
      )}
    </div>
  );
}
