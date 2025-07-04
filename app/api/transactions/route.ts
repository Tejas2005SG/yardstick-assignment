import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  if (!data.amount || !data.date || !data.description || !data.category) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  try {
    const transaction = await Transaction.create(data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 