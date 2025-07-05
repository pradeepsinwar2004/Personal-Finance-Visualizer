"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Utilities", "Other"];


type BudgetFormProps = {
  onSuccess?: () => void;
};

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [category, setCategory] = useState("Food");
  const [month, setMonth] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({ category, month, budget: Number(budget) }),
    });
    setMonth("");
    setBudget("");
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <h2 className="text-lg font-bold">Set Budget</h2>
      <select className="border p-2 rounded w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
      </select>
      <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <Input type="number" placeholder="Budget Amount" value={budget} onChange={(e) => setBudget(e.target.value)} />
      <Button type="submit">Save Budget</Button>
    </form>
  );
}
