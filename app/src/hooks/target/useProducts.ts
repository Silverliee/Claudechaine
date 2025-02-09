"use client";

import { productsData } from "@/data/target/products";
import { Product } from "@/types/target/Products";
import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return { products };
};

export default useProducts;
