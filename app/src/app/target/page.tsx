import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/shadcn/card";
import {Button} from "@/components/shadcn/button";
import Link from "next/link";
import {
    Blocks,
    ShoppingBag,
    Link2,
    Zap
} from "lucide-react";

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="
          text-4xl 
          font-bold 
          mb-4 
          text-primary
          bg-gradient-to-r 
          from-primary 
          to-primary/70 
          bg-clip-text 
          text-transparent
        ">
                    Target Loyalty : Site Partenaire
                </h1>
                <p className="
          text-xl 
          text-muted-foreground 
          max-w-2xl 
          mx-auto
        ">
                    Un environnement de test simulant un partenaire dans un écosystème de tokens de loyauté blockchain
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Blocks className="mr-3 text-primary"/>
                            Concept de Test
                        </CardTitle>
                        <CardDescription>
                            Simulation d'un partenaire commercial
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Ce site représente un environnement de test qui simule un partenaire commercial dans un
                            écosystème de tokens de loyauté basé sur la blockchain.
                            Il démontre comment différents sites peuvent interagir avec un système de fidélisation
                            décentralisé.
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Link2 className="mr-3 text-primary"/>
                            Connexion avec le Site Principal
                        </CardTitle>
                        <CardDescription>
                            Interaction entre plateformes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Les tokens acquis sur le site principal peuvent être utilisés ici,
                            illustrant la flexibilité et l'interopérabilité d'un système de loyauté blockchain.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center">
                <div className="
          bg-secondary/10 
          rounded-lg 
          p-8 
          max-w-3xl 
          mx-auto 
          border 
          border-border/30
        ">
                    <h2 className="
            text-2xl 
            font-bold 
            mb-4 
            text-primary
          ">
                        Comment Ça Fonctionne
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <ShoppingBag className="w-12 h-12 text-primary mb-3"/>
                            <p className="text-muted-foreground text-center">
                                Achetez des produits sur différentes plateformes
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Zap className="w-12 h-12 text-primary mb-3"/>
                            <p className="text-muted-foreground text-center">
                                Générez des tokens de loyauté automatiquement
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Blocks className="w-12 h-12 text-primary mb-3"/>
                            <p className="text-muted-foreground text-center">
                                Utilisez vos tokens sur différents sites partenaires
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link href="/target/products">
                    <Button size="lg">
                        Explorer les Produits
                    </Button>
                </Link>
            </div>
        </div>
    );
}