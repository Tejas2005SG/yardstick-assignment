"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import MonthlyBarChart from '../components/MonthlyBarChart';
import CategoryPieChart from '../components/CategoryPieChart';
import DashboardCards from '../components/DashboardCards';
import { toast } from 'sonner';

function getCurrentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function DashboardPage() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<React.ReactNode>('');

  useEffect(() => {
    fetchData();
  }, [month]);

  async function fetchData() {
    setLoading(true);
    try {
      const [txRes, budgetRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/budgets'),
      ]);
      
      if (!txRes.ok) {
        const errorData = await txRes.text();
        console.error('Transactions API error:', txRes.status, errorData);
        throw new Error(`Failed to fetch transactions: ${txRes.status}`);
      }
      
      if (!budgetRes.ok) {
        const errorData = await budgetRes.text();
        console.error('Budgets API error:', budgetRes.status, errorData);
        throw new Error(`Failed to fetch budgets: ${budgetRes.status}`);
      }
      
      const txData = await txRes.json();
      const budgetData = await budgetRes.json();
      setTransactions(txData);
      setBudgets(budgetData);
      
      // Insight logic
      const monthBudgets = budgetData.filter((b: any) => b.month === month);
      const overBudget: string[] = [];
      for (const b of monthBudgets) {
        const spent = txData.filter((tx: any) => tx.category === b.category && tx.date.startsWith(month)).reduce((sum: number, tx: any) => sum + tx.amount, 0);
        if (spent > b.amount) {
          overBudget.push(`${b.category} (₹${spent.toFixed(2)} / ₹${b.amount.toFixed(2)})`);
        }
      }
      
      if (overBudget.length > 0) {
        setInsight(
          <div className="text-sm text-red-600 dark:text-red-400">
            ⚠️ Over budget: {overBudget.join(', ')}
          </div>
        );
      } else {
        setInsight(
          <div className="text-sm text-green-600 dark:text-green-400">
            ✅ All categories within budget
          </div>
        );
      }
    } catch (error: any) {
      console.error('Dashboard fetch error:', error);
      toast.error(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Financial Dashboard</h1>
          <p className="text-muted-foreground">Overview of your spending and budgets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Monthly Summary</CardTitle>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="bg-background border rounded px-3 py-1 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <DashboardCards transactions={transactions} budgets={budgets} month={month} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="text-sm">
                  {insight || 'No insights available'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Your spending pattern over time</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <MonthlyBarChart transactions={transactions} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Breakdown of {month} expenses</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-72 w-full" />
              ) : (
                <CategoryPieChart transactions={transactions.filter((tx: any) => tx.date.startsWith(month))} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}