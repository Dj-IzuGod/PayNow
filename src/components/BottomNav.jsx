import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, HelpCircle, UserRound } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  // Bottom navigation items

  return (
    <div className="fixed  bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around">
      <Link
        key="/"
        to="/"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-2 mb-2">
          <Home size={16} />
        </div>
        <span className="text-sm">Home</span>
        {location.pathname === "/" && (
          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
        )}
      </Link>
      <Link
        key="/CustomerCare"
        to="/CustomerCare"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/CustomerCare"
            ? "text-blue-500"
            : "text-gray-500"
        }`}
      >
        <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-2 mb-2">
          <HelpCircle size={16} />
        </div>
        <span className="text-sm">Customer service</span>
        {location.pathname === "/CustomerCare" && (
          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
        )}
      </Link>
      <Link
        key="/me"
        to="/me"
        className={`flex flex-col items-center p-2 ${
          location.pathname === "/me" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <div className="add-money bg-black text-white max-w-fit rounded-lg shadow-md p-2 mb-2">
          <UserRound size={16} />
        </div>
        <span className="text-sm">Me</span>
        {location.pathname === "/me" && (
          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
        )}
      </Link>
    </div>
  );
}
