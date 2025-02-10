"use client";

import { abi } from "@/data/abi";
import { Transaction } from "@/types/base/Transaction";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const useTransactionHistory = () => {
    const account = useAccount();
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const  contractAddress = process.env.NEXT_PUBLIC_LOYALTY_CONTRACT_ADDRESS;

    const {
        data,
        isError,
        isLoading,
    } = useReadContract({
        abi,
        address: contractAddress!,
        functionName: "getTransactionHistory",
        args: [account.address]
    });

    useEffect(() => {
        if (data !== undefined && !isError && !isLoading) {
            setTransactions(data as Transaction[]);
        }
        console.log(data);
    }, [data, isError, isLoading]);

    return {
        transactions,
        isError,
        isLoading,
    };
};

export default useTransactionHistory;