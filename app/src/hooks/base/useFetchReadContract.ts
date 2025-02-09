"use client";

import { useEffect, useState } from "react";
import { abi } from "@/data/abi";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { toast } from "../shadcn/use-toast";

const useFetchReadContract = (
  hash: `0x${string}` | undefined,
  purchaseType: number
) => {
  const account = useAccount();
  const [prevReturnValue, setPrevReturnValue] = useState<number | undefined>(0);

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const { data: returnValue, refetch } = useReadContract({
    abi,
    address: "0x49e812ACc64dA4052e2fbE9b087C160dAe18e37d",
    functionName: "balanceOf",
    args: [account.address, purchaseType],
  });

  useEffect(() => {
    if (isConfirming) {
      refetch();
      toast({
        title: "Transaction",
        description: "Transaction en cours...",
      });
    } else if (isConfirmed) {
      refetch();
    } else if (isError) {
      toast({
        title: "Transaction",
        description: `Transaction annulée ou échouée: ${error?.message}`,
        variant: "destructive",
      });
    }
  }, [isConfirming, isConfirmed, isError, error, refetch, returnValue]);

  //TODO : debug pourquoi la première transaction faite génère deux toaster
  useEffect(() => {
    if (isConfirmed && returnValue !== prevReturnValue) {
      setPrevReturnValue(Number(returnValue));
      toast({
        title: "Transaction",
        description: `Vous avez maintenant ${returnValue} token`,
      });
    }
  }, [returnValue, isConfirmed, prevReturnValue]);

  return returnValue;
};

export default useFetchReadContract;
