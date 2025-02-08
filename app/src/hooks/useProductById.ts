"use client";

import { getProductByUUID } from "@/data/products";
import { Product } from "@/types/Products";
import { useEffect, useState } from "react";

const useProductByUUID = (uuid: string) => {
  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    const product = getProductByUUID(uuid);
    setProduct(product);
  }, [uuid]);

  return product;
};

export default useProductByUUID;
