import React from "react";
import { useUser } from "@civic/auth-web3/react";
import { useState } from "react";

const AddMoneyPage = () => {
  const { user } = useUser();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "bank", name: "Bank Transfer", icon: "🏦" },
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "crypto", name: "Crypto Wallet", icon: "🪙" },
    { id: "mobile", name: "Mobile Money", icon: "📱" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Add your payment processing logic here
    console.log(`Adding ${amount} via ${selectedMethod}`);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Money</h1>

      {/* Wallet Balance */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-600">Available Balance</p>
        <p className="text-3xl font-bold">
          ₦{user?.balance?.toLocaleString() || "0.00"}
        </p>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        {/* Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₦</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </p>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`p-3 border rounded-md flex flex-col items-center ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl mb-1">{method.icon}</span>
                <span className="text-sm">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !amount}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Add Money"
          )}
        </button>
      </form>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <div className="space-y-3">
          {[].length > 0 ? (
            // Map through transactions here
            <p className="text-gray-500 text-center py-4">
              No recent transactions
            </p>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent transactions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPage;
