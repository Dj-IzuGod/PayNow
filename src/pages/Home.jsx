// import { Link } from "react-router-dom";
// import React from "react";
// import { UserButton } from "@civic/auth-web3/react";
// import { useUser } from "@civic/auth-web3/react";
// import { CivicAuthProvider } from "@civic/auth-web3/react";

// const services = [
//   { name: "Transfer", path: "/transfer" },
//   { name: "Airtime", path: "/airtime" },
//   { name: "School Fees", path: "/school-fees" },
//   { name: "Add Money", path: "/add-money" },
//   { name: "TV Subscription", path: "/tv-subscription" },
// ];

import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@civic/auth-web3/react";
import { Plus, Wallet, Navigation, School, Tv, Signal } from "lucide-react";

const Home = () => {
  const { user } = useUser();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-fit rounded-full bg-blue-50 content-center shadow-md p-6 mb-8">
        <img src="{user.picture}" alt="User logo" />
      </div>
      {/* Header with time and greeting */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-lg font-semibold">{currentTime}</span>
        <h1 className="text-2xl font-bold">Hi, {user?.name || "User"}</h1>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-gray-500 text-sm mb-2">Available balance</h2>
        <p className="font-bold text-3xl md:text-4xl sm:text-sm lg:text-4xl">
          ₦200,000.00
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-200 rounded-xl">
        <Link key="/add-money" to="/add-money">
          <div className=" text-black  p-10 flex flex-col items-center">
            <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
              <Plus />
            </div>
            <span className="text-lg text-center">Add money</span>
          </div>
        </Link>

        <Link key="/transfer" to="/transfer">
          <div className=" text-black  p-10 flex flex-col items-center">
            <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
              <Navigation />
            </div>
            <span className="text-lg">Transfer</span>
          </div>
        </Link>

        <Link key="/me" to="/me">
          <div className=" text-black  p-10 flex flex-col items-center">
            <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
              <Wallet />
            </div>
            <span className="text-lg">Wallet</span>
          </div>
        </Link>
      </div>

      {/* Services */}
      <div className="bg-gray-200 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-center p-[20px]">
          Services
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-8 p-[10px]  ">
          <Link key="/airtime" to="/airtime">
            <div className=" text-black  p-4 flex flex-col items-center">
              <div className="add-money bg-black  text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
                <Signal />
              </div>
              <span className="text-lg">Airtime</span>
            </div>
          </Link>

          <Link key="/tv" to="/tv">
            <div className=" text-black  p-4 flex flex-col items-center">
              <div className="add-money bg-black  text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
                <Tv />
              </div>
              <span className="text-lg">TV</span>
            </div>
          </Link>

          <Link key="/school-payment" to="/school-payment">
            <div className=" text-black  p-4 flex flex-col items-center">
              <div className="add-money bg-black  text-white max-w-fit rounded-lg shadow-md p-6 mb-8">
                <School />
              </div>
              <span className="text-lg text-center">School Payment</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Transaction History */}
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Placeholder for transaction list */}
        <p className="text-gray-500 text-center py-8">No recent transactions</p>
      </div>
    </div>
  );
};

export default Home;
