"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn/card";
import { getValuesFromKey } from "@/types/base/PurchaseTypeEnum";
import useBalanceOfHook from "@/hooks/base/useBalanceOfHook";
import { Coins, ShoppingBag, Shirt } from "lucide-react";

const BalanceComponent = ({ purchaseKey }: { purchaseKey: string }) => {
    const value = getValuesFromKey(purchaseKey);
    const total = useBalanceOfHook(value!);

    const getIcon = () => {
        switch (purchaseKey) {
            case "Electronics":
                return <ShoppingBag className="h-6 w-6 text-blue-500" />;
            case "Clothes":
                return <Shirt className="h-6 w-6 text-purple-500" />;
            default:
                return <Coins className="h-6 w-6 text-amber-500" />;
        }
    };

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    {getIcon()}
                    <CardTitle className="text-lg font-semibold">{purchaseKey}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base">
                    {total == null ? (
                        <div className="animate-pulse rounded bg-gray-200 p-2">
                            Chargement...
                        </div>
                    ) : (
                        <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-indigo-600">
                {total.toString()}
              </span>
                            <span className="text-gray-600">tokens</span>
                        </div>
                    )}
                </CardDescription>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
                Utilisable pour la catégorie {purchaseKey.toLowerCase()}
            </CardFooter>
        </Card>
    );
};

export default BalanceComponent;