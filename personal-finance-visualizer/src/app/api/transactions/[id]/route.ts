import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";



export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();
  await connectDB();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  await connectDB();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
