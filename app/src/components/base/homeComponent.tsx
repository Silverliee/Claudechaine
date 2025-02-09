import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Coins, ShoppingBag, Gift, Wallet } from "lucide-react";
import Link from "next/link";

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Hero Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-5xl font-bold text-indigo-900">Programme de Fidélité Web3</h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                        Gagnez et utilisez des tokens de fidélité pour obtenir des réductions sur vos achats futurs.
                        Un système innovant basé sur la blockchain pour récompenser votre fidélité.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/base/products">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                Découvrir les produits
                            </Button>
                        </Link>
                        <Link href="/base/balance">
                            <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                                <Wallet className="mr-2 h-5 w-5" />
                                Voir mon solde
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-indigo-900">Comment ça marche ?</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="h-6 w-6 text-indigo-600" />
                                    1. Achetez
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Faites vos achats sur notre plateforme et gagnez automatiquement des points de fidélité
                                    basés sur le montant de vos achats.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coins className="h-6 w-6 text-indigo-600" />
                                    2. Accumulez
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Vos points sont convertis en tokens de fidélité lorsque vous atteignez 100 points.
                                    Ces tokens sont stockés de manière sécurisée sur la blockchain.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Gift className="h-6 w-6 text-indigo-600" />
                                    3. Économisez
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Utilisez vos tokens pour obtenir des réductions sur vos prochains achats.
                                    Chaque token a une valeur spécifique selon la catégorie de produit.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-indigo-600 py-16 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold">Avantages du Programme</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                            <h3 className="mb-4 text-xl font-semibold">Tokens Spécifiques par Catégorie</h3>
                            <p>
                                Nos tokens sont spécialisés par catégorie (Électronique, Vêtements, etc.),
                                vous permettant d'obtenir des réductions optimisées selon vos achats.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                            <h3 className="mb-4 text-xl font-semibold">Gestion Transparente</h3>
                            <p>
                                Grâce à la blockchain, suivez facilement vos points et tokens.
                                Historique complet de vos récompenses disponible à tout moment.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                            <h3 className="mb-4 text-xl font-semibold">Conversion Automatique</h3>
                            <p>
                                Les points sont automatiquement convertis en tokens dès que vous atteignez le seuil,
                                sans action nécessaire de votre part.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                            <h3 className="mb-4 text-xl font-semibold">Récompenses Garanties</h3>
                            <p>
                                Vos tokens sont sécurisés sur la blockchain, garantissant leur valeur
                                et leur disponibilité pour vos futures réductions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold text-indigo-900">Prêt à commencer ?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                        Rejoignez notre programme de fidélité innovant et commencez à gagner des tokens dès aujourd'hui !
                    </p>
                    <Link href="/base/products">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                            Découvrir les produits
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default HomePage;