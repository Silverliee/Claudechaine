"use client";

import { productsData } from "@/data/base/products";
import { Product } from "@/types/base/Products";
import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return { products };
};

export default useProducts;
