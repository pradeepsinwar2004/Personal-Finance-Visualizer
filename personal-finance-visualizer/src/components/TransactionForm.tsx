'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  'Food', 'Transport', 'Rent', 'Shopping', 'Entertainment', 'Utilities', 'Others',
];

type TransactionFormProps = {
  onSuccess?: () => void;
};

export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Others'); // Default to "Others" (match backend/chart)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !description || !category) return;

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(amount),
        date,
        description,
        category,
      }),
    });

    if (res.ok) {
      if (onSuccess) onSuccess(); // reload list
      setAmount('');
      setDate('');
      setDescription('');
      setCategory('Others'); // reset to default
    } else {
      console.error('Failed to save transaction');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded shadow bg-white"
    >
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        className="border p-2 rounded text-gray-700"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
