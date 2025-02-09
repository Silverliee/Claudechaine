import React from "react";
import Link from "next/link";
import {
    Github,
    Twitter,
    LinkedinIcon,
    Mail
} from "lucide-react";

const FooterComponent = () => {
    return (
        <footer className="
      bg-secondary/10 
      border-t 
      border-border/20 
      py-12 
      mt-8
    ">
            <div className="
        container 
        mx-auto 
        px-4 
        grid 
        md:grid-cols-3 
        gap-8
      ">
                {/* Company Info */}
                <div>
                    <h3 className="
            text-xl 
            font-bold 
            mb-4 
            text-primary
          ">
                        Loyalty Token
                    </h3>
                    <p className="
            text-muted-foreground 
            text-sm
          ">
                        Transformez vos achats en opportunités de fidélisation grâce à notre plateforme de tokens de
                        loyauté.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="
            text-lg 
            font-semibold 
            mb-4 
            text-primary
          ">
                        Navigation
                    </h4>
                    <nav className="space-y-2">
                        <Link
                            href="/base"
                            className="
                block 
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/base/products"
                            className="
                block 
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                        >
                            Produits
                        </Link>
                        <Link
                            href="/base/balance"
                            className="
                block 
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                        >
                            Mes Tokens
                        </Link>
                    </nav>
                </div>

                {/* Social Media & Contact */}
                <div>
                    <h4 className="
            text-lg 
            font-semibold 
            mb-4 
            text-primary
          ">
                        Contactez-nous
                    </h4>
                    <div className="flex space-x-4 mb-4">
                        <a
                            href="#"
                            className="
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6"/>
                        </a>
                        <a
                            href="#"
                            className="
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                            aria-label="Twitter"
                        >
                            <Twitter className="w-6 h-6"/>
                        </a>
                        <a
                            href="#"
                            className="
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                            aria-label="LinkedIn"
                        >
                            <LinkedinIcon className="w-6 h-6"/>
                        </a>
                        <a
                            href="#"
                            className="
                text-muted-foreground 
                hover:text-primary 
                transition-colors
              "
                            aria-label="Email"
                        >
                            <Mail className="w-6 h-6"/>
                        </a>
                    </div>
                    <p className="
            text-sm 
            text-muted-foreground
          ">
                        © 2024 Loyalty Token. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;