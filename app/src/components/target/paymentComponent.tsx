"use client";
import { abi } from "@/data/abi";
import useBalanceOfHook from "@/hooks/base/useBalanceOfHook"; //TODO
import useFetchReadContract from "@/hooks/base/useFetchReadContract"; //TODO
import { toast } from "@/hooks/shadcn/use-toast";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "../shadcn/button";
import fetchBlockchainJsonById from "@/utils/target/fetchBlockchainJson";
import { Product } from "@/types/target/Products";
import { getKeyFromValue } from "@/types/target/PurchaseTypeEnum";
import { Input } from "../shadcn/input";

const DISCOUNT_PER_TOKEN_TYPE_1 = 5;

const PaymentComponent = ({ product }: { product: Product }) => {
  const account = useAccount();
  const [tokenAmountUse, setTokenAmountUse] = useState(0);
  const [reduction, setReduction] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState(product.price);
  const total = useBalanceOfHook(product.purchaseType);
  const  contractAddress = process.env.NEXT_PUBLIC_VERIFY_TOKEN_CONTRACT_ADDRESS;

  const { data: hash, writeContract, isPending } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePayment = async () => {
    if (!account.address) {
      alert("Veuillez vous connecter !");
      return;
    }

    try {
      writeContract({
        abi,
        address: contractAddress!,
        functionName: "useToken",
        args: [
          product.purchaseType,
          tokenAmountUse,
          getKeyFromValue(product.purchaseType),
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

  useEffect(() => {
    if (isConfirming) {
      toast({
        title: "Transaction",
        description: "Transaction en cours...",
      });
    } else if (isConfirmed) {
      toast({
        title: "Succès",
        description: "La transaction a été confirmée avec succès !",
        variant: "default",
      });
    } else if (isError) {
      toast({
        title: "Transaction",
        description: `Transaction annulée ou échouée: ${error?.message}`,
        variant: "destructive",
      });
    }
  }, [isConfirmed, isConfirming]);

  useEffect(() => {
    const maxTokenUsable = Number(total);
    const tokenUsed = Math.min(tokenAmountUse, maxTokenUsable);
    setFinalPrice(Math.max(product.price - tokenUsed * reduction));
  }, [tokenAmountUse, total]);

  useEffect(() => {
    fetchBlockchainJsonById(product.purchaseType)
      .then((data) => {
        setReduction(data.discount_amount_euros);
      })
      .catch((err) => {
        setReduction(0);
        toast({
          title: "Reduction",
          description: `Une erreur est survenue pendant la récupération du taux de réduction`,
          variant: "destructive",
        });
      });
  }, []);

  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const inputValue = event.target.value;

  //     if (!isNaN(Number(inputValue)) && Number(inputValue) <= total!) {
  //       setTokenAmountUse(Number(inputValue));
  //     }
  //   };

  const handleChange = (value: number) => {
    const maxTokenUsable = Number(total);
    const newValue = Math.min(value, maxTokenUsable);
    setTokenAmountUse(newValue);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Paiement</h2>
      <h1 className="mt-2 font-bold">Prix de base : {product.price}€</h1>
      <p className="mt-2 text-gray-600">
        Nombre de token utilisables : {total}
      </p>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Utiliser des tokens pour une réduction :
        </label>
        <Input
          type="number"
          min="0"
          max={total !== null ? Number(total) : 0}
          value={tokenAmountUse}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </div>
      <p className="mt-2 text-green-600">Prix final : {finalPrice}€</p>
      <Button onClick={handlePayment} disabled={isPending || finalPrice <= 0}>
        {isPending ? "Paiement en cours..." : "Payer"}
      </Button>
    </div>
  );
};

export default PaymentComponent;
