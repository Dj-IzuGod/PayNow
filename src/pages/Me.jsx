"use client"; // Add this at the top for Next.js or frameworks that use Server Components
import React, { useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { CivicAuthProvider, UserButton } from "@civic/auth-web3/react";

const ProfilePage = () => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const userContext = useUser();

  // Handle wallet creation on component mount
  React.useEffect(() => {
    const initializeWallet = async () => {
      if (userContext.user && !userHasWallet(userContext)) {
        try {
          await userContext.createWallet();
        } catch (error) {
          console.error("Wallet creation failed:", error);
        }
      }
    };
    initializeWallet();
  });

  const walletAddress = userContext.solana.address;

  const copyToClipboard = () => {
    if (!walletAddress) return;

    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <UserButton />
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={user.name || "Not available"}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email || "Not provided"}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Wallet Address */}
        {walletAddress && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm truncate"
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {copied ? (
                  <span className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-1 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
