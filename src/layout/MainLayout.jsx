import React from "react";
// src/layout/MainLayout.jsx
import BottomNav from "../components/BottomNav";
import { BalanceProvider } from "../contexts/BalanceContext";

export default function MainLayout({ children }) {
  return (
    <BalanceProvider>
      <div className="pb-16">
        {" "}
        {/* Padding bottom so BottomNav doesn't overlap */}
        {children}
        <BottomNav />
      </div>
    </BalanceProvider>
  );
}
