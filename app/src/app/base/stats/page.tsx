"use client";
import React from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import useStatsQuery from "@/hooks/base/useStatsQuery";

export default function StatsPage() {
    const account = useAccount();
    const { globalStats, userStats, isLoading } = useStatsQuery(account.address);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Statistiques du programme de fidélité</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Statistiques globales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques globales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total des points</p>
                                <p className="text-2xl font-bold">{globalStats?.totalPoints.toString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total des tokens</p>
                                <p className="text-2xl font-bold">{globalStats?.totalTokens.toString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                                <p className="text-2xl font-bold">{globalStats?.activeUsers.toString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistiques personnelles */}
                {account.address && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Vos statistiques</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Points accumulés</p>
                                    <div className="space-y-2">
                                        {userStats?.loyaltyPoints.map((point, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>{point.purchaseType}:</span>
                                                <span className="font-bold">{point.amount.toString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Tokens obtenus</p>
                                    <div className="space-y-2">
                                        {userStats?.tokenTransfers
                                            .filter(transfer => transfer.type === "MINT")
                                            .map((transfer, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <span>Token #{transfer.tokenId.toString()}:</span>
                                                    <span className="font-bold">{transfer.amount.toString()}</span>
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