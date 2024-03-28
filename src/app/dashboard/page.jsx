"use client"

import OverviewGraph from "@/app/lib/ui/dashboard-overview/balance-over-time";
import ExpensesPie from "@/app/lib/ui/dashboard-overview/expenses-pie";

export default function DashboardPage() {
  const sectionHeaderStyling = "text-xl font-bold md:text-2xl";
  return (
    <main className="w-full h-full bg-gray-950 text-white flex flex-col gap-4 p-4">
      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Overview</h1>
      </div>

      <div className="rounded-lg border-2 p-12 border-gray-500">
        <h1 className={sectionHeaderStyling}>Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OverviewGraph />
        <ExpensesPie />
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Goals</h1>
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Budget</h1>
      </div>
    </main>
  );
}
