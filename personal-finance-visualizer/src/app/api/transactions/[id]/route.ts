import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";


// @ts-ignore
export async function PUT(req: Request, { params }) {
  const { id } = params;
  const body = await req.json();
  await connectDB();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

// @ts-ignore
export async function DELETE(_: Request, { params }) {
  const { id } = params;
  await connectDB();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
