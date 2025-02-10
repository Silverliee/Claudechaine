"use client"
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../shadcn/button";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const HeaderComponent = () => {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/base/" },
    { name: "Products", path: "/base/products/" },
    { name: "Balance", path: "/base/balance/" },
    { name: "Historique", path: "/base/history/" },
    { name: "Statistiques", path: "/base/stats/" },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-slate-700 to-slate-800 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Mobile menu button */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
          >
            {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
            ) : (
                <Menu className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-white md:flex">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`relative transition-colors hover:text-white/80 ${
                        isActivePath(item.path)
                            ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-white"
                            : "text-white/70"
                    }`}
                >
                  {item.name}
                </Link>
            ))}
          </nav>

          {/* Mobile navigation */}
          {isMenuOpen && (
              <div className="absolute left-0 top-16 w-full bg-purple-500 p-4 md:hidden">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                      <Link
                          key={item.path}
                          href={item.path}
                          className={`text-sm font-medium ${
                              isActivePath(item.path)
                                  ? "text-white"
                                  : "text-white/70"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                  ))}
                </nav>
              </div>
          )}

          <div className="flex items-center gap-4">
            <Link href={"/target"}>
              <Button variant="secondary" className="hover:bg-purple-400">
                Changer de site
              </Button>
            </Link>
            {account.status === "disconnected" &&
                connectors.map((connector) => (
                    <Button
                        key={connector.uid}
                        variant="secondary"
                        onClick={() => connect({ connector })}
                        className="hover:bg-purple-400"
                    >
                      Connexion
                    </Button>
                ))}
            {account.status === "connected" && (
                <Button
                    variant="destructive"
                    onClick={() => disconnect()}
                    className="hover:bg-red-600"
                >
                  Déconnexion
                </Button>
            )}
          </div>
        </div>
      </header>
  );
};

export default HeaderComponent;