"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/transactions");
    const data: Transaction[] = await res.json();
    setTransactions(data);
  };

  const deleteTx = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      {transactions.map((tx) => (
        <div key={tx._id} className="flex justify-between items-center p-2 border rounded mb-2">
          <div>
            <strong>₹{tx.amount}</strong> — {tx.description} on {tx.date}
          </div>
          <Button variant="destructive" onClick={() => deleteTx(tx._id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
