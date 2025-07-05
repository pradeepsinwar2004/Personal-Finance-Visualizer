"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCard from "@/components/SummaryCard";
import BudgetForm from "@/components/BudgetForm";
import BudgetChart from "@/components/BudgetChart";
import Insights from "@/components/Insights";

export default function HomePage() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const loadData = () => {
    setReloadFlag((prev) => !prev);
  };

  useEffect(() => {
    // Trigger any initial data load here if needed
  }, []);

  return (
    <main className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Visualizer
      </h1>

      {/* 💳 Summary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard key={reloadFlag.toString()} />
      </div>

      {/* 💸 Transaction Input and List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TransactionForm onSuccess={loadData} />
        <TransactionList key={reloadFlag.toString()} />
      </div>

      {/* 📊 Category Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Category-wise Expenses</h2>
        <CategoryPieChart key={reloadFlag.toString()} />
      </div>

      {/* 🧾 Budget Form */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Set Monthly Budgets</h2>
        <BudgetForm onSuccess={loadData} />
      </div>

      {/* 📈 Budget vs Actual */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Budget vs Actual Expenses</h2>
        <BudgetChart key={reloadFlag.toString()} />
      </div>

      {/* 💡 Insights */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Spending Insights</h2>
        <Insights key={reloadFlag.toString()} />
      </div>
    </main>
  );
}
