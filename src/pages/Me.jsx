import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  createConfig,
  useAccount,
  useConnect,
  useBalance,
  http,
} from "wagmi";
import { userHasWallet } from "@civic/auth-web3";
import { embeddedWallet } from "@civic/auth-web3/wagmi";
import { CivicAuthProvider, UserButton, useUser } from "@civic/auth-web3/react";
import { mainnet, sepolia } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [embeddedWallet()],
});

// Wagmi requires react-query
const queryClient = new QueryClient();

// Wrap the content with the necessary providers to give access to hooks: react-query, wagmi & civic auth provider
// initialChain is passed into <CivicAuthProvider /> to indicate the first chain you want to use.
// The chain can be switched later using wagmi's useSwitchChain() hook.
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider
          clientId="c5ccb965-b480-4b9a-a2c4-95755f1e7b07"
          initialChain={mainnet}
        >
          <AppContent />
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

// Separate component for the app content that needs access to hooks
const AppContent = () => {
  // Add the civic hooks
  const userContext = useUser();
  useAutoConnect();

  // Add the wagmi hooks
  const { isConnected, address } = useAccount();
  const balance = useBalance({ address });

  return (
    <>
      <UserButton />
      {userContext.user && (
        <div>
          {!userHasWallet(userContext) && (
            <p>
              <button onClick={createWallet}>Create Wallet</button>
            </p>
          )}
          {userHasWallet(userContext) && (
            <>
              <p>Wallet address: {userContext.eth.address}</p>
              <p>
                Balance:{" "}
                {balance?.data
                  ? `${(
                      BigInt(balance.data.value) / BigInt(1e18)
                    ).toString()} ${balance.data.symbol}`
                  : "Loading..."}
              </p>
              {isConnected ? (
                <p>Wallet is connected</p>
              ) : (
                <button onClick={connectExistingWallet}>Connect Wallet</button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
