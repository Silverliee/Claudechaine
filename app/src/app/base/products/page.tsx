"use client";
import useFetchProducts from "@/hooks/base/useProducts";
import ProductCard from "@/components/base/product";
import React, { useState } from "react";
import { Product } from "@/types/base/Products";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/shadcn/dialog";
import PayButtonComponent from "@/components/base/payButton";

export default function Page() {
  const { products } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
              <ProductCard
                  // @ts-ignore
                  key={product.id}
                  product={product}
                  isBtnAddToCart
                  onProductClick={() => setSelectedProduct(product)}
              />
          ))}
        </div>

        <Dialog
            open={!!selectedProduct}
            onOpenChange={() => setSelectedProduct(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Détails du Produit</DialogTitle>
            </DialogHeader>

            {selectedProduct && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                      <p className="text-muted-foreground mt-2">
                        Prix : {selectedProduct.price}€
                      </p>
                    </div>
                  </div>
                    <span>{selectedProduct.description}</span>
                  <PayButtonComponent product={selectedProduct} />
                </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
};