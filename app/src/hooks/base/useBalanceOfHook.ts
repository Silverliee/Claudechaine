"use client";

import { abi } from "@/data/abi";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const useBalanceOfHook = (purchaseType: number): bigint | null => {
  const account = useAccount();

  const [balance, setBalance] = useState<bigint | null>(null);

  const {
    data: returnValue,
    isError,
    isLoading,
  } = useReadContract({
    abi,
    address: "0x49e812ACc64dA4052e2fbE9b087C160dAe18e37d",
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
