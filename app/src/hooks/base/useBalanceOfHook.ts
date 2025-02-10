"use client";

import { abi } from "@/data/abi";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const useBalanceOfHook = (purchaseType: number): bigint | null => {
  const account = useAccount();

  const [balance, setBalance] = useState<bigint | null>(null);
  const  contractAddress = process.env.NEXT_PUBLIC_LOYALTY_CONTRACT_ADDRESS;

  const {
    data: returnValue,
    isError,
    isLoading,
  } = useReadContract({
    abi,
    address: contractAddress!,
    functionName: "balanceOf",
    args: [account.address, purchaseType],
  });

  useEffect(() => {
    if (returnValue !== undefined && !isError && !isLoading) {
      setBalance(returnValue as bigint);
    }
  }, [returnValue, isError, isLoading]);

  return balance;
};

export default useBalanceOfHook;
