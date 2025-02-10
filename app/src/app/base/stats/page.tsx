"use client";
import React from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import useStatsQuery from '@/hooks/base/useStatsQuery';

export default function StatsPage() {
    const account = useAccount();
    const { user, isLoading } = useStatsQuery(account.address);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Statistiques</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Points et Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {user?.transactions.map((point, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{point.purchaseType}:</span>
                                    <span className="font-bold">{point.amount.toString()}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {account.address && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Historique</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Tokens créés</p>
                                    <div className="space-y-2">
                                        {user?.tokenMints.map((mint, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>Token #{mint.tokenId.toString()}</span>
                                                <span className="font-bold">{mint.amount.toString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Tokens utilisés</p>
                                    <div className="space-y-2">
                                        {user?.tokenUsages.map((usage, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>Token #{usage.tokenId.toString()}</span>
                                                <span className="font-bold">{usage.amount.toString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}