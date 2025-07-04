"use client";
import { Transaction } from './TransactionList';
import { Budget } from './BudgetBarChart';

function getTotalExpenses(transactions: Transaction[], month: string) {
  return transactions
    .filter((tx) => tx.date.startsWith(month))
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function getCategorySummary(transactions: Transaction[], month: string) {
  const summary: Record<string, number> = {};
  transactions.forEach((tx) => {
    if (tx.date.startsWith(month)) {
      summary[tx.category] = (summary[tx.category] || 0) + tx.amount;
    }
  });
  return Object.entries(summary)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export default function DashboardCards({ transactions, budgets, month }: { transactions: Transaction[]; budgets: Budget[]; month: string }) {
  const total = getTotalExpenses(transactions, month);
  const recent = transactions.filter((tx) => tx.date.startsWith(month)).slice(0, 5);
  const categorySummary = getCategorySummary(transactions, month);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Expenses */}
      <div className="bg-blue-600 text-white rounded-lg p-4 shadow flex flex-col items-center">
        <div className="text-lg font-semibold">Total Expenses</div>
        <div className="text-2xl font-bold mt-2">₹{total.toFixed(2)}</div>
        <div className="text-xs mt-1">({month})</div>
      </div>
      {/* Most Recent Transactions */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
        <div className="text-lg font-semibold mb-2">Recent Transactions</div>
        {recent.length === 0 ? (
          <div className="text-gray-500 text-center">No transactions.</div>
        ) : (
          <ul className="text-sm divide-y divide-gray-200 dark:divide-zinc-800">
            {recent.map((tx) => (
              <li key={tx._id} className="py-1 flex flex-col">
                <span className="font-medium">₹{tx.amount.toFixed(2)}</span>
                <span className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()} &mdash; {tx.description} ({tx.category})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Category Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow">
        <div className="text-lg font-semibold mb-2">Category Summary</div>
        {categorySummary.length === 0 ? (
          <div className="text-gray-500 text-center">No data.</div>
        ) : (
          <ul className="text-sm divide-y divide-gray-200 dark:divide-zinc-800">
            {categorySummary.map((cat) => (
              <li key={cat.category} className="py-1 flex justify-between">
                <span>{cat.category}</span>
                <span className="font-medium">₹{cat.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 