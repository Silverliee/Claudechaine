//import { useAccount, useReadContract } from "wagmi";
import React from "react";
import { getAllPurchaseTypeKeys } from "@/types/PurchaseTypeEnum";
import BalanceComponent from "@/components/balance";

export default function Page() {
  const purchaseTypes = getAllPurchaseTypeKeys();
  return (
    <div className="grid grid-cols-4 gap-3">
      {purchaseTypes.map((purchase, index) => (
        <BalanceComponent key={index} purchaseKey={purchase} />
      ))}
    </div>
  );
}
