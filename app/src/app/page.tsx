"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <h1 className="text-3xl font-bold underline">azer</h1>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      {account.status === "connected" && (
        <div className="mt-4">
          <Link href="/products">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Voir la liste des produits
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default App;
