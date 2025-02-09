"use client";

import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "@/data/abi";
import { toast } from "@/hooks/shadcn/use-toast";
import useFetchReadContract from "@/hooks/base/useFetchReadContract";
import { Button } from "../shadcn/button";
import { Product } from "@/types/base/Products";
import { PurchaseType } from "@/types/base/PurchaseTypeEnum";

const PayButtonComponent = ({ product }: { product: Product }) => {
  const account = useAccount();

  const { data: hash, writeContract } = useWriteContract();
  useFetchReadContract(hash, product.purchaseType);

  const handlePayment = async () => {
    if (!account.address) {
      alert("Veuillez vous connecter !");
      return;
    }

    try {
      writeContract({
        abi,
        address: "0x49e812ACc64dA4052e2fbE9b087C160dAe18e37d",
        functionName: "saveLoyaltyPoints",
        args: [
          account.address,
          BigInt(product.price),
          PurchaseType[product.purchaseType],
        ],
      });
    } catch {
      toast({
        title: "Erreur",
        description: "La transaction a rencontré une erreur",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Button
        key="saveLoyaltyPointButton"
        onClick={handlePayment}
        type="button"
      >
        Payer
      </Button>
    </div>
  );
};

export default PayButtonComponent;
