"use client";
import React from "react";
import { ChartBar } from "lucide-react";
import StatsDashboard from "@/components/base/statsDashboard";

export default function StatsPage() {
    return (
        <div className="container mx-auto py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-3">
                    <ChartBar className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Statistiques
                    </h1>
                </div>
                <p className="mt-2 text-center text-gray-600">
                    Visualisez les statistiques de vos tokens de fidélité
                </p>
            </div>

            <StatsDashboard />
        </div>
    );
}