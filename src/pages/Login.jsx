import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@civic/auth-web3/react";
import { CivicAuthProvider, UserButton } from "@civic/auth-web3/react";

// src/pages/Login.jsx
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";

export default function Login() {
  const { user, signIn, authStatus } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <CivicAuthProvider clientId="c5ccb965-b480-4b9a-a2c4-95755f1e7b07">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">PayNow</h1> <br />
        <br />
        <br />
        <br />
        <div className="max-w-sm w-full bg-white shadow-xl rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          <p className="mb-6 text-gray-600">
            Click the button to Log in or Create account
          </p>

          <UserButton
            onClick={handleLogin}
            disabled={authStatus === "authenticating"}
            className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-900 transition"
          />

          <p className="text-xs text-gray-400 mt-6">
            By continuing, you agree to our <strong>Terms of Service</strong>{" "}
            and <strong>Privacy Policy</strong>.
          </p>
        </div>
      </div>
    </CivicAuthProvider>
  );
}
