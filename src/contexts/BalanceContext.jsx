// contexts/BalanceContext.js
"use client";

import { React, createContext, useContext, useState, useEffect } from "react";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("fakeBalance");
    const savedTransactions = localStorage.getItem("fakeTransactions");
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save to localStorage when changes occur
  useEffect(() => {
    localStorage.setItem("fakeBalance", balance.toString());
    localStorage.setItem("fakeTransactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  const addMoney = (amount) => {
    const newBalance = balance + amount;
    const newTransaction = {
      id: Date.now(),
      amount,
      date: new Date().toLocaleString(),
      type: "deposit",
      status: "completed",
    };

    setBalance(newBalance);
    setTransactions((prev) => [newTransaction, ...prev]);
    return newBalance;
  };

  return (
    <BalanceContext.Provider value={{ balance, transactions, addMoney }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
