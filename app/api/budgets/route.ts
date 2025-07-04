import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Budget from '@/models/Budget';

export async function GET(req: NextRequest) {
  await dbConnect();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  if (!data.category || !data.month || !data.amount) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  try {
    // Upsert: update if exists, else create
    const budget = await Budget.findOneAndUpdate(
      { category: data.category, month: data.month },
      { $set: { amount: data.amount } },
      { upsert: true, new: true }
    );
    return NextResponse.json(budget, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 