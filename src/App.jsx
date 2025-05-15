import React, { useEffect } from "react";
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router";
import { CivicAuthProvider, useUser } from "@civic/auth-web3/react";
import useSWR from "swr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { mainnet, sepolia } from "wagmi/chains";

// import { AuthStatusIndicator } from "./pages/Home";

// Pages
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import Airtime from "./pages/Airtime";
import SchoolFees from "./pages/SchoolFees";
import AddMoney from "./pages/AddMoney";
import TVSubscription from "./pages/TVSubscription";
import CustomerCare from "./pages/CustomerCare";
import Me from "./pages/Me";
import MainLayout from "./layout/MainLayout";
import "./index.css";
import Login from "./pages/login";

const queryClient = new QueryClient();

function useFastUser() {
  const { data } = useSWR(
    "civic-user",
    async () => {
      const res = await civic.getUserFast(); // Mock API
      return res.data;
    },
    {
      revalidateOnFocus: false,
    }
  );
  return data;
}

// Protected Route Wrapper
const AuthChecker = ({ children }) => {
  const { user, authStatus, isLoading } = useUser();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading application..."
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authStatus === "authenticated" && !user) {
      setLoadingMessage("Loading profile...");
    }
  }, [authStatus, user]);

  // Display nothing until initial check completes (removes flash of loading)
  if (isLoading && authStatus === "loading") {
    return null;
  }

  // Show loading only when we have tokens but no user yet
  if (authStatus === "authenticated" && !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">{loadingMessage}</div>
      </div>
    );
  }

  if (authStatus === "authenticated" && user) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

const LoginRedirector = () => {
  const { user } = useUser();
  const { authStatus } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [authStatus, navigate]);

  return null;
};

// Temporary debug component
const DebugAuth = () => {
  const { user, authStatus, idToken } = useUser();

  useEffect(() => {
    console.log("Current auth state:", {
      user,
      authStatus,
      tokenPresent: !!idToken,
    });
  }, [user, authStatus]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <Login /> <LoginRedirector />
      </>
    ),
    errorElement: <div>Not found</div>,
  },
  {
    path: "/",
    element: (
      // <AuthChecker>
      <AuthChecker>
        <MainLayout>
          <Home />
        </MainLayout>
      </AuthChecker>
    ),
  },

  {
    path: "/me",
    element: (
      <AuthChecker>
        <MainLayout>
          <Me />
        </MainLayout>
      </AuthChecker>
    ),
  },
  {
    path: "/CustomerCare",
    element: (
      <AuthChecker>
        <MainLayout>
          <CustomerCare />
        </MainLayout>
      </AuthChecker>
    ),
  },
  // {
  //   // path: "/profiles",
  //   // element: <ProfilesPage />,
  //   // children: [
  //   //   {
  //   //     path: "/profiles/:profileId",
  //   //     element: <ProfilePage />,
  //   //   },
  //   ],
  // },
]);

function App() {
  const { authStatus } = useUser();

  useEffect(() => {
    const start = performance.now();
    return () => {
      console.log(`Auth check took ${performance.now() - start}ms`);
    };
  }, [authStatus]);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CivicAuthProvider
          clientId="c5ccb965-b480-4b9a-a2c4-95755f1e7b07"
          initialChain={mainnet}
          onSignInSuccess={() =>
            console.log("User data should be available now")
          }
          leeway={30}
          cacheStrategy="aggressive"
          tokenRefreshMargin={300}
          autoSignIn={true}
          onSignIn={(error) => {
            if (!error) {
              console.log("Sign-in completed, user should be available");
            }
          }}
        >
          <RouterProvider router={router} />
          <DebugAuth />
        </CivicAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
