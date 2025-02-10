import { useState, useEffect } from 'react';

interface Transaction {
    timestamp: string;
    transactionType: string;
    amount: string;
    purchaseType: string;
}

interface DailyStats {
    date: string;
    purchase_type: string;
    total_earned: string;
    total_used: string;
    unique_users: number;
}

interface Stats {
    totalTokensEarned: number;
    totalTokensUsed: number;
    totalTransactions: number;
    uniqueUsers: number;
}

interface CategoryData {
    name: string;
    value: number;
}

interface MonthlyData {
    month: string;
    earned: number;
    used: number;
}

interface UseIndexerStatsReturn {
    stats: Stats;
    monthlyData: MonthlyData[];
    categoryData: CategoryData[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

const defaultStats: Stats = {
    totalTokensEarned: 0,
    totalTokensUsed: 0,
    totalTransactions: 0,
    uniqueUsers: 0
};

export const useIndexerStats = (refreshInterval = 30000): UseIndexerStatsReturn => {
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const processData = (data: DailyStats[]) => {
        const totals = data.reduce((acc, curr) => ({
            totalTokensEarned: acc.totalTokensEarned + Number(curr.total_earned),
            totalTokensUsed: acc.totalTokensUsed + Number(curr.total_used),
            uniqueUsers: Math.max(acc.uniqueUsers, curr.unique_users),
            totalTransactions: acc.totalTransactions + 1
        }), {
            totalTokensEarned: 0,
            totalTokensUsed: 0,
            uniqueUsers: 0,
            totalTransactions: 0
        });

        setStats(totals);

        // Traiter les données mensuelles
        const byMonth = new Map<string, MonthlyData>();
        data.forEach(item => {
            const month = new Date(item.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
            const current = byMonth.get(month) || { month, earned: 0, used: 0 };
            byMonth.set(month, {
                month,
                earned: current.earned + Number(item.total_earned),
                used: current.used + Number(item.total_used)
            });
        });
        setMonthlyData(Array.from(byMonth.values()));

        // Traiter les données par catégorie
        const byCategory = new Map<string, CategoryData>();
        data.forEach(item => {
            const current = byCategory.get(item.purchase_type)?.value || 0;
            byCategory.set(item.purchase_type, {
                name: item.purchase_type,
                value: current + Number(item.total_earned)
            });
        });
        setCategoryData(Array.from(byCategory.values()));
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/stats');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch stats');
            }

            const data = await response.json();

            if (!data || !data.data) {
                throw new Error('Invalid data format');
            }

            if (!Array.isArray(data.data)) {
                console.log('Received data:', data); // Pour le debugging
                throw new Error('Expected array of stats');
            }

            processData(data.data);
            setError(null);
        } catch (err) {
            console.error('Error in useIndexerStats:', err);
            setError(err instanceof Error ? err : new Error('Unknown error'));
            // Réinitialiser les états en cas d'erreur
            setStats(defaultStats);
            setMonthlyData([]);
            setCategoryData([]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();

        if (refreshInterval > 0) {
            const interval = setInterval(fetchData, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]);

    return {
        stats,
        monthlyData,
        categoryData,
        isLoading,
        error,
        refetch: fetchData
    };
};