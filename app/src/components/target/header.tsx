"use client";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../shadcn/button";
import React from "react";

const HeaderComponent = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <header>
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-blue-500">
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href={{ pathname: "/target/" }}
            className="hover:underline hover:underline-offset-4"
          >
            Home
          </Link>
          <Link
            href={{ pathname: "/target/products/" }}
            className="hover:underline hover:underline-offset-4"
          >
            Products
          </Link>
          <Link
            href={{ pathname: "/target/" }}
            className="hover:underline hover:underline-offset-4"
          >
            Balance
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href={"/base"}>
            <Button>Changer de site</Button>
          </Link>
          {account.status === "disconnected" &&
            connectors.map((connector) => (
              <Button
                key={connector.uid}
                variant={"default"}
                onClick={() => connect({ connector })}
                type="button"
              >
                Connexion
              </Button>
            ))}
          {account.status === "connected" && (
            <Button
              variant={"destructive"}
              type="button"
              onClick={() => disconnect()}
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
