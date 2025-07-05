import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";


interface Params {
  id: string;
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = params;
  const body = await req.json();
  await connectDB();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}


export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = params;
  await connectDB();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
