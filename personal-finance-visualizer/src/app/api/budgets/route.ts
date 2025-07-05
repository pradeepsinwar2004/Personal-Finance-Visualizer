import { connectDB } from "@/lib/mongodb";
import { Budget } from "@/models/budget";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const newBudget = await Budget.create(body);
  return NextResponse.json(newBudget);
}

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}
