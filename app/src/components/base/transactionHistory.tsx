"use client"
import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/shadcn/card";
import { useEffect, useState } from 'react';
import { abi } from "@/data/abi";
import { Transaction } from '@/types/base/Transaction';

const TransactionHistoryComponent = () => {
    const account = useAccount();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const {
        data: events,
        isError,
        isLoading,
    } = useReadContract({
        abi,
        address: "0xaBd3E00d04dfa5d7b47eF7E3d5ecFB4e10AE97a9",
        functionName: "getTransactionHistory",
        args: [account.address],
    });

    useEffect(() => {
        if (events && !isError && !isLoading) {
            setTransactions(events as Transaction[]);
        }
    }, [events, isError, isLoading]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Historique des Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <div className="text-center text-gray-500">
                            Aucune transaction trouvée
                        </div>
                    ) : (
                        <div className="divide-y">
                            {transactions.map((tx, index) => (
                                <div key={index} className="py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{tx.type}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(tx.timestamp * 1000).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${tx.type === 'EARN' ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.type === 'EARN' ? '+' : '-'}{tx.amount} tokens
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {tx.purchaseType}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionHistoryComponent;