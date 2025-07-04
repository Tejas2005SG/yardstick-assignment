import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Budget from '@/models/Budget';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Budget.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  if (!data.category || !data.month || !data.amount) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  try {
    const updated = await Budget.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 