"use client";
import React from "react";
import { Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import HistoryComponent from "@/components/base/historyComponent";

export default function HistoryPage() {
    return (
        <div className="container mx-auto py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-3">
                    <Clock className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Historique des Transactions
                    </h1>
                </div>
                <p className="mt-2 text-center text-gray-600">
                    Consultez l'historique de vos tokens de fidélité
                </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Toutes les transactions</TabsTrigger>
                    <TabsTrigger value="received">Tokens reçus</TabsTrigger>
                    <TabsTrigger value="used">Tokens utilisés</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <HistoryComponent />
                </TabsContent>
                <TabsContent value="received" className="mt-4">
                    <HistoryComponent />
                </TabsContent>
                <TabsContent value="used" className="mt-4">
                    <HistoryComponent />
                </TabsContent>
            </Tabs>
        </div>
    );
}