"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { getValuesFromKey } from "@/types/PurchaseTypeEnum";
import useBalanceOfHook from "@/hooks/useBalanceOfHook";

const BalanceComponent = ({ purchaseKey }: { purchaseKey: string }) => {
  const value = getValuesFromKey(purchaseKey);
  const total = useBalanceOfHook(value!);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{purchaseKey}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {total == null && ""}
          {total != null && "Nombre de token : " + total}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {/* <Button onClick={}>Récupérer le total</Button> */}
      </CardFooter>
    </Card>
  );
};

export default BalanceComponent;
