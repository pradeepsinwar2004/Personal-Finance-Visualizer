"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

export default function BudgetChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [txRes, budgetRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budgets"),
      ]);

      const transactions: Transaction[] = await txRes.json();
      const budgets: Budget[] = await budgetRes.json();

      const currentMonth = new Date().toISOString().slice(0, 7);

      const spendingByCategory: Record<string, number> = {};
      transactions.forEach((tx) => {
        const month = tx.date.slice(0, 7);
        if (month === currentMonth) {
          spendingByCategory[tx.category] = (spendingByCategory[tx.category] || 0) + tx.amount;
        }
      });

      const merged = budgets
        .filter((b) => b.month === currentMonth)
        .map((b) => ({
          category: b.category,
          budget: b.budget,
          spent: spendingByCategory[b.category] || 0,
        }));

      setData(merged);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#34d399" name="Budget" />
          <Bar dataKey="spent" fill="#f87171" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
