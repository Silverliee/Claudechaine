"use client";
import useFetchProducts from "@/hooks/target/useProducts";
import ProductCard from "@/components/target/product";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/shadcn/dialog";
import { Product } from "@/types/target/Products";
import PaymentComponent from "@/components/target/paymentComponent";

export default function Page() {
  const { products } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // @ts-ignore
  return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
              <ProductCard
                  // @ts-ignore
                  key={product.id}
                  product={product}
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

                  <PaymentComponent product={selectedProduct} />
                </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
};