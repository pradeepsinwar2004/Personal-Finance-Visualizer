"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  category: string;
  amount: number;
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
  "#FF4444",
];

export default function CategoryPieChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((txs: Transaction[]) => {
        const categoryTotals: Record<string, number> = {};
        txs.forEach((tx) => {
          categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
        });

        const formatted = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
        setData(formatted);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
