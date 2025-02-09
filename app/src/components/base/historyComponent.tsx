"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/table";
import { useAccount } from "wagmi";
import { Transaction } from "@/types/base/Transaction";
import useTransactionHistory from "@/hooks/base/useTransactionHistory";

const HistoryComponent = () => {
  const { transactions, isLoading, isError } = useTransactionHistory();

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionTypeStyle = (type: string) => {
    switch (type) {
      case "EARN":
        return "bg-green-100 text-green-800";
      case "USE":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center p-8">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="rounded-lg border bg-red-50 p-4 text-red-600">
          Une erreur est survenue lors de la récupération de l'historique.
        </div>
    );
  }

  const transactionsList = transactions as Transaction[] | undefined;

  return (
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsList && transactionsList.length > 0 ? (
                transactionsList.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(tx.timestamp)}</TableCell>
                      <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getTransactionTypeStyle(tx.transactionType)}`}>
                    {tx.transactionType === "EARN" ? "Gagné" : "Utilisé"}
                  </span>
                      </TableCell>
                      <TableCell>
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800">
                    {tx.purchaseType}
                  </span>
                      </TableCell>
                      <TableCell className={`font-medium ${tx.transactionType === "EARN" ? "text-green-600" : "text-blue-600"}`}>
                        {tx.transactionType === "EARN" ? "+" : "-"}{tx.amount.toString()} tokens
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
  );
};

export default HistoryComponent;