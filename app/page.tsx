"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ListChecks, Wallet, ArrowRight, TrendingUp, PieChart } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-12"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <PieChart className="absolute -left-10 -top-4 h-8 w-8 text-primary opacity-60" />
            <TrendingUp className="absolute -right-8 -bottom-4 h-8 w-8 text-primary opacity-60" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Personal Finance Visualizer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mt-6 mb-10 max-w-2xl mx-auto leading-relaxed">
            Gain <span className="font-medium text-primary">clear insights</span> into your spending habits, 
            <span className="font-medium text-primary"> visualize</span> your financial health, and 
            <span className="font-medium text-primary"> optimize</span> your budgets with our intuitive tools.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {/* Dashboard Card */}
          <Link href="/dashboard" passHref>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="hover:shadow-lg transition-shadow group border-2 border-transparent hover:border-primary/20 relative overflow-hidden h-full cursor-pointer">
                {mounted && (
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'from-blue-900/30 to-transparent' : 'from-blue-100/50 to-transparent'}`} />
                )}
                <CardHeader className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <LayoutDashboard className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl">Dashboard</CardTitle>
                  <CardDescription className="text-center mt-2">
                    Comprehensive overview with interactive charts and financial insights.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Transactions Card */}
          <Link href="/transactions" passHref>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="hover:shadow-lg transition-shadow group border-2 border-transparent hover:border-green-500/20 relative overflow-hidden h-full cursor-pointer">
                {mounted && (
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'from-green-900/30 to-transparent' : 'from-green-100/50 to-transparent'}`} />
                )}
                <CardHeader className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                    <ListChecks className="h-8 w-8 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl">Transactions</CardTitle>
                  <CardDescription className="text-center mt-2">
                    Manage all your income and expenses with powerful categorization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button variant="outline" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                    View Transactions
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Budgets Card */}
          <Link href="/budgets" passHref>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="hover:shadow-lg transition-shadow group border-2 border-transparent hover:border-purple-500/20 relative overflow-hidden h-full cursor-pointer">
                {mounted && (
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark' ? 'from-purple-900/30 to-transparent' : 'from-purple-100/50 to-transparent'}`} />
                )}
                <CardHeader className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <Wallet className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl">Budgets</CardTitle>
                  <CardDescription className="text-center mt-2">
                    Set and track budgets with visual progress indicators and alerts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button variant="outline" className="group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    Manage Budgets
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          <p>Get started in seconds. No credit card required.</p>
        </motion.div>
      </div>
    </motion.main>
  );
}