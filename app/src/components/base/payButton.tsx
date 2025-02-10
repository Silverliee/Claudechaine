"use client";

import React from "react";
import {useAccount, useWriteContract} from "wagmi";
import {abi} from "@/data/abi";
import {toast} from "@/hooks/shadcn/use-toast";
import useFetchReadContract from "@/hooks/base/useFetchReadContract";
import {Button, ButtonProps} from "../shadcn/button";
import {Product} from "@/types/base/Products";
import {PurchaseType} from "@/types/base/PurchaseTypeEnum";
import {cn} from "@/lib/shadcn/utils";

interface PayButtonProps extends ButtonProps {
    product: Product;
    children?: React.ReactNode;
}

const PayButtonComponent: React.FC<PayButtonProps> = ({
                                                          product,
                                                          children = "Payer",
                                                          className,
                                                          variant = "default",
                                                          ...props
                                                      }) => {
    const account = useAccount();

    const {data: hash, writeContract} = useWriteContract();
    useFetchReadContract(hash, product.purchaseType);
    const  contractAddress = process.env.NEXT_PUBLIC_LOYALTY_CONTRACT_ADDRESS;

    const handlePayment = async () => {
        if (!account.address) {
            toast({
                title: "Connexion requise",
                description: "Veuillez vous connecter avant de procéder au paiement",
                variant: "destructive",
            });
            return;
        }

        try {

            writeContract({
                abi,
                // @ts-ignore
                address: contractAddress!,
                functionName: "saveLoyaltyPoints",
                args: [
                    account.address,
                    BigInt(product.price),
                    PurchaseType[product.purchaseType],
                ],
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "La transaction a rencontré une erreur",
                variant: "destructive",
            });
            console.error("Payment error:", error);
        }
    };

    return (
        <Button
            onClick={handlePayment}
            variant={variant}
            className={cn(
                "transition-all duration-300 hover:opacity-80",
                className
            )}
            type="button"
            {...props}
        >
            {children}
        </Button>
    );
};

export default PayButtonComponent;