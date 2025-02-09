"use client";

import { getProductByUUID } from "@/data/target/products";
import { Product } from "@/types/target/Products";
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
