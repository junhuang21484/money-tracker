import { fetchAccountByUserID } from "@/app/lib/data/accounts";
import { fetchGoalByUserID } from "@/app/lib/data/goals";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import { fetchUserTransactions } from "@/app/lib/data/transactions";
import { fetchUserNetBalance } from "@/app/lib/data/user";
import OverviewCardWrapper from "@/app/lib/ui/dashboard-overview/overview-card-wrapper";
import CreateGoalBtn from "@/app/lib/ui/dashboard-overview/goals/create-goal-btn";
import GoalCard from "@/app/lib/ui/dashboard-overview/goals/goal-card";
import SearchBar from "@/app/lib/ui/util/searchBar";
import OrderFilter from "@/app/lib/ui/util/orderFilter";
import OverviewGraph from "@/app/lib/ui/dashboard-overview/chart/balance-over-time";
import ExpensesPie from "@/app/lib/ui/dashboard-overview/chart/expenses-pie";

export default async function DashboardPage() {
  const sectionHeaderStyling = "text-xl font-bold md:text-2xl";
  const userId = await getLoggedInUserID()
  const accountData = await fetchAccountByUserID(userId);
  const goalData = await fetchGoalByUserID(userId);
  const transactionsData = await fetchUserTransactions(userId);
  const netBalance = await fetchUserNetBalance(userId);

  return (
    <main className="w-full h-full bg-gray-950 text-white flex flex-col gap-4 p-4">
      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Overview</h1>
        <OverviewCardWrapper userId={userId} />
      </div>

      <div className="rounded-lg border-2 p-12 border-gray-500">
        <h1 className={sectionHeaderStyling}>Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <OverviewGraph transactionsData={transactionsData} netBalance={netBalance}/>
          <ExpensesPie transactionsData={transactionsData} />
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500 flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <h1 className={sectionHeaderStyling}>Goals</h1>
          <CreateGoalBtn userId={userId} accountData={accountData} />
        </div>

        <div className="flex justify-between w-full gap-2">
          <div className="flex-1">
            <SearchBar placeholder="Search by name, target amount" />
          </div>
          <div>
            <OrderFilter filterOption={["Goal Name", "Target Amount"]} />
          </div>
        </div>
        {goalData.length === 0 && (
          <div className="text-center text-xl w-full">
            No goal data to display
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {goalData.map((goal) => (
            <GoalCard
              key={goal.goal_id}
              goalData={goal}
              allAccountInfo={accountData}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
