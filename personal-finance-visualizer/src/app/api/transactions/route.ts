import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, description, date, category } = await req.json();

  if (!amount || !description || !date || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();

  const newTx = await Transaction.create({
    amount,
    description,
    date,
    category, // ✅ include category when saving
  });

  return NextResponse.json(newTx, { status: 201 });
}

export async function GET() {
  await connectDB();
  const allTx = await Transaction.find().sort({ createdAt: -1 });
  return NextResponse.json(allTx);
}
