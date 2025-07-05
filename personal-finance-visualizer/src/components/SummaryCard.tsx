"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Transaction {
  amount: number;
  description: string;
  category: string;
  date: string;
}

export default function SummaryCards() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => setTransactions(data));
  }, []);

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const recent = transactions.slice(0, 3);
  const topCategories = [...new Set(transactions.map((t) => t.category))].slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card className="p-4">
        <h3 className="font-bold text-lg">Total Expenses</h3>
        <p className="text-2xl">₹{total}</p>
      </Card>

      <Card className="p-4">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        {recent.map((tx, i) => (
          <p key={i} className="text-sm">
            ₹{tx.amount} - {tx.description}
          </p>
        ))}
      </Card>

      <Card className="p-4">
        <h3 className="font-bold text-lg">Top Categories</h3>
        {topCategories.map((cat, i) => (
          <p key={i}>{cat}</p>
        ))}
      </Card>
    </div>
  );
}
