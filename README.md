# Personal Finance Visualizer

A simple, responsive web application to track personal finances, visualize spending patterns, and manage budgets.

## 🚀 Features
- Add, edit, and delete transactions
- Categorize expenses
- Visualize monthly and category-wise spending (bar & pie charts)
- Set and track monthly budgets per category
- Dashboard with total expenses, recent transactions, and category summary
- Responsive, clean UI (shadcn/ui + Tailwind CSS)
- MongoDB backend (Mongoose)
- Ready for Vercel/GitHub deployment

## 🛠 Tech Stack
- **Frontend:** Next.js 13+ (App Router), React, shadcn/ui, Recharts, Tailwind CSS
- **Backend:** MongoDB (Mongoose), Next.js API Routes
- **State Management:** React local state

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd yardstick_assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MongoDB:**
   Create a `.env.local` file in the root:
   ```env
   MONGO_URI=mongodb+srv://bhangaletejas003:ZHNH0HUZfL3q4ECO@cluster0.adjo8zd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖥️ Usage
- Use the **Dashboard** tab for a summary, charts, and insights.
- Use the **Transactions** tab to add, edit, or delete expenses.
- Use the **Budgets** tab to set monthly budgets per category and track your progress.

## 🌐 Deployment
- Ready for deployment on [Vercel](https://vercel.com/) or any platform supporting Next.js.
- Push to GitHub and connect your repo to Vercel for 1-click deployment.

**Live URL:** _Coming soon_

---

© 2024 Personal Finance Visualizer
