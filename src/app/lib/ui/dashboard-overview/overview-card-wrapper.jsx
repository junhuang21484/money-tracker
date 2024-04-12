import { formatCurrency } from "@/app/lib/utils";
import { getUserOverview } from "@/app/lib/data/user";
import OverviewCard from "@/app/lib/ui/dashboard-account/details/overview-card";

export default async function OverviewCardWrapper({userId}) {
  const {
    availableFund,
    outstandingDebt,
    highestIncomeData,
    highestSpendingData,
    yearlySpendingIncome,
  } = await getUserOverview(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-4 ">
      <OverviewCard
        data={[
          {
            title: "Net Balance",
            value: formatCurrency(availableFund - outstandingDebt),
            type: "balance",
          },
          {
            title: "Available Fund",
            value: formatCurrency(availableFund),
            type: "income",
          },
          {
            title: "Outstanding Debt",
            value: formatCurrency(outstandingDebt),
            type: "expense",
          },
        ]}
      />
      <OverviewCard
        data={[
          {
            title: "Highest Spending Category",
            value: highestSpendingData.category,
            type: "balance",
          },
          {
            title: "Highest Spending Category Total",
            value: formatCurrency(highestSpendingData.amount),
            type: "balance",
          },
          {
            title: "Highest Income Category",
            value: highestIncomeData.category,
            type: "income",
          },
          {
            title: "Highest Income Category Total",
            value: formatCurrency(highestIncomeData.amount),
            type: "balance",
          },
        ]}
      />
      <OverviewCard
        data={[
          {
            title: "Total Income (YTD)",
            value: formatCurrency(yearlySpendingIncome.total_income),
            type: "balance",
          },
          {
            title: "Average Income / Month",
            value: formatCurrency(yearlySpendingIncome.total_income / 12),
            type: "balance",
          },
          {
            title: "Total Expense (YTD)",
            value: formatCurrency(yearlySpendingIncome.total_expense),
            type: "balance",
          },
          {
            title: "Average Expense / Month",
            value: formatCurrency(yearlySpendingIncome.total_expense / 12),
            type: "balance",
          }
        ]}
      />
    </div>
  );
}
