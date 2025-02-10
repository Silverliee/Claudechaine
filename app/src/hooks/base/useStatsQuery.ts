import { useState, useEffect } from 'react';

interface LoyaltyPointsSaved {
    amount: bigint;
    purchaseType: string;
    timestamp: bigint;
    blockTimestamp: bigint;
}

interface TokenEvent {
    tokenId: bigint;
    amount: bigint;
    timestamp: bigint;
    blockTimestamp: bigint;
}

interface User {
    id: string;
    totalPointsEarned: bigint;
    totalTokensMinted: bigint;
    totalTokensUsed: bigint;
    transactions: LoyaltyPointsSaved[];
    tokenMints: TokenEvent[];
    tokenUsages: TokenEvent[];
}

const useStatsQuery = (userAddress?: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!userAddress) {
                setIsLoading(false);
                return;
            }

            try {
                const query = `
         {
           user(id: "${userAddress}") {
             id
             totalPointsEarned
             totalTokensMinted
             totalTokensUsed
             transactions {
               amount
               purchaseType
               timestamp
               blockTimestamp
             }
             tokenMints {
               tokenId
               amount
               timestamp
               blockTimestamp
             }
             tokenUsages {
               tokenId
               amount
               timestamp
               blockTimestamp
             }
           }
         }
       `;

                const response = await fetch(process.env.NEXT_PUBLIC_SUBGRAPH_URL!, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });

                const data = await response.json();
                setUser(data.data.user);
            } catch (error) {
                console.error('Error fetching user stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userAddress]);

    return { user, isLoading };
};

export default useStatsQuery;