import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CivicAuthProvider } from "@civic/auth-web3/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CivicAuthProvider clientId="c5ccb965-b480-4b9a-a2c4-95755f1e7b07">
      <App />
    </CivicAuthProvider>
  </React.StrictMode>
);
