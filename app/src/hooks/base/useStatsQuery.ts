import { useState, useEffect } from 'react';

interface LoyaltyPoint {
    amount: bigint;
    purchaseType: string;
    timestamp: bigint;
}

interface TokenTransfer {
    tokenId: bigint;
    amount: bigint;
    type: string;
    timestamp: bigint;
}

interface GlobalStats {
    totalPoints: bigint;
    totalTokens: bigint;
    activeUsers: bigint;
}

interface UserStats {
    loyaltyPoints: LoyaltyPoint[];
    tokenTransfers: TokenTransfer[];
}

const useStatsQuery = (userAddress?: string) => {
    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requête pour les stats globales
                const globalQuery = `
          {
            statistics(id: "global") {
              totalPoints
              totalTokens
              activeUsers
            }
          }
        `;

                // Requête pour les stats utilisateur si une adresse est fournie
                const userQuery = userAddress ? `
          {
            user(id: "${userAddress}") {
              loyaltyPoints {
                amount
                purchaseType
                timestamp
              }
              tokenTransfers {
                tokenId
                amount
                type
                timestamp
              }
            }
          }
        ` : null;

                // Exécuter les requêtes
                const globalResponse = await fetch(process.env.NEXT_PUBLIC_SUBGRAPH_URL!, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: globalQuery }),
                });
                const globalData = await globalResponse.json();

                setGlobalStats(globalData.data.statistics);

                if (userQuery && userAddress) {
                    const userResponse = await fetch(process.env.NEXT_PUBLIC_SUBGRAPH_URL!, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query: userQuery }),
                    });
                    const userData = await userResponse.json();
                    setUserStats(userData.data.user);
                }

            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userAddress]);

    return { globalStats, userStats, isLoading };
};

export default useStatsQuery;