import React from "react";
// src/layout/MainLayout.jsx
import BottomNav from "../components/BottomNav";

export default function MainLayout({ children }) {
  return (
    <div className="pb-16">
      {" "}
      {/* Padding bottom so BottomNav doesn't overlap */}
      {children}
      <BottomNav />
    </div>
  );
}
