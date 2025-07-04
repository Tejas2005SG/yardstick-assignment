import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Budget from '@/models/Budget';

// PUT: Update a budget by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();
  const { category, month, amount } = await req.json();

  if (!category || !month || !amount) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      context.params.id,
      { category, month, amount },
      { new: true }
    );

    if (!updatedBudget) {
      return NextResponse.json({ error: 'Budget not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedBudget);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a budget by ID
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedBudget = await Budget.findByIdAndDelete(context.params.id);

    if (!deletedBudget) {
      return NextResponse.json({ error: 'Budget not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Budget deleted successfully.', success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
