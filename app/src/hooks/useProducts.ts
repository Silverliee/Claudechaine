"use client";

import { Product } from "@/types/Products";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const productsData: Product[] = [
  {
    id: uuidv4(),
    name: "Laptop",
    price: 120.0,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
  },
  {
    id: uuidv4(),
    name: "Smartphone",
    price: 800.0,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
  },
  {
    id: uuidv4(),
    name: "Headphones",
    price: 150,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
  },
  {
    id: uuidv4(),
    name: "Keyboard",
    price: 100,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
  },
];

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return { products };
};

export default useProducts;
