"use client";

import { useEffect, useState } from "react";

interface Transaction {
  amount: number;
  date: string;
  category: string;
}

interface Budget {
  category: string;
  budget: number;
  month: string;
}

export default function Insights() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const [txRes, budgetRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budgets"),
      ]);
      const transactions: Transaction[] = await txRes.json();
      const budgets: Budget[] = await budgetRes.json();

      const currentMonth = new Date().toISOString().slice(0, 7);

      const spent: Record<string, number> = {};
      transactions.forEach((tx) => {
        if (tx.date.slice(0, 7) === currentMonth) {
          spent[tx.category] = (spent[tx.category] || 0) + tx.amount;
        }
      });

      const insights: string[] = [];
      budgets.forEach((b) => {
        if (b.month === currentMonth) {
          const used = spent[b.category] || 0;
          if (used > b.budget) {
            insights.push(`⚠️ You are overspending on ${b.category}.`);
          } else {
            insights.push(`✅ You are within budget for ${b.category}.`);
          }
        }
      });

      setMessages(insights);
    };

    fetchInsights();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Spending Insights</h2>
      <ul className="list-disc pl-4 space-y-1">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
