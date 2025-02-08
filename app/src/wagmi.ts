import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { sepolia } from "wagmi/chains";

export function getConfig() {
  return createConfig({
    chains: [sepolia],
    connectors: [
      // injected(),
      // coinbaseWallet(),
      // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
