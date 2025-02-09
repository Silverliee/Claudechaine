import React from "react";
import { getAllPurchaseTypeKeys } from "@/types/base/PurchaseTypeEnum";
import BalanceComponent from "@/components/base/balance";
import { Wallet } from "lucide-react";

export default function Page() {
  const purchaseTypes = getAllPurchaseTypeKeys();

  return (
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mes Tokens</h1>
          </div>
          <p className="mt-2 text-center text-gray-600">
            Consultez vos tokens de fidélité par catégorie
          </p>
        </div>

        {/* Grid de balance cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {purchaseTypes.map((purchase, index) => (
              <BalanceComponent key={index} purchaseKey={purchase} />
          ))}
        </div>
      </div>
  );
}