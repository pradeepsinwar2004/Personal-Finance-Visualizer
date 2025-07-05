"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  month: string;
  amount: number;
}

interface Transaction {
  amount: number;
  date: string;
}

export default function ExpensesChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((txs: Transaction[]) => {
        const monthlyTotals: Record<string, number> = {};

        txs.forEach((tx) => {
          const month = tx.date.slice(0, 7); // YYYY-MM
          monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
        });

        const formattedData: ChartData[] = Object.entries(monthlyTotals).map(
          ([month, amount]) => ({
            month,
            amount: Number(amount),
          })
        );

        setData(formattedData);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
