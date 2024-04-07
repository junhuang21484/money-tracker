"use server";

import { fetchAccountByID } from "@/app/lib/data/accounts";
import { fetchFilteredTransactions, getTransactionSummaryByAccountId } from "@/app/lib/data/transactions";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import OverviewCard from "@/app/lib/ui/dashboard-account/details/overview-card";
import AccountNameEdit from "@/app/lib/ui/dashboard-account/details/account-name-edit";
import Link from "next/link";
import SimpleGraph from "@/app/lib/ui/dashboard-account/details/balance-graph";
import SpendingPieChart from "@/app/lib/ui/dashboard-account/details/pie-chart";
import { formatCurrency, convertToTitleCase } from "@/app/lib/utils";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import DelAccountBtn from "@/app/lib/ui/dashboard-account/details/delete-account-btn";
import {
  AddTransactionBtn,
  SyncTransactionBtn,
} from "@/app/lib/ui/dashboard-account/transactions/buttons";
import TransactionsTable from "@/app/lib/ui/dashboard-account/transactions/transactions-table";
import SearchBar from "@/app/lib/ui/util/searchBar";
import OrderFilter from "@/app/lib/ui/util/orderFilter"

export default async function AccountDetails({ params, searchParams }) {
  const userID = await getLoggedInUserID();
  const accountID = params.id;
  const query = searchParams?.query || "";
  const orderBy = searchParams?.orderBy || "";
  const filterDirection = searchParams?.filterDirection || "";
  const accountData = await fetchAccountByID(accountID);
  const transactionSummary = await getTransactionSummaryByAccountId(accountID);
  if (!accountData) return <div>Account Not Found</div>;

  const accountBalance = formatCurrency(accountData.balance);
  const positiveTransactionSum = formatCurrency(transactionSummary?.total_positive_amount || 0);
  const negativeTransactionSum = formatCurrency(transactionSummary?.total_negative_amount || 0);
  const transactionData = await fetchFilteredTransactions(accountID, query, orderBy, filterDirection);

  if (userID != accountData.user_id) {
    return <div>User not permitted</div>;
  }

  const sectionHeaderStyling = "text-xl font-bold md:text-2xl"
  return (
    <main className="w-full h-full bg-gray-950 text-white flex flex-col gap-4 p-4">
      <AccountNameEdit
        userID={userID}
        accountID={accountID}
        accountName={accountData.name}
      />

      <div className="flex w-full justify-between">
        <Link
          href="/dashboard/accounts"
          className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
        >
          <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
          Back
        </Link>

        <DelAccountBtn accountData={accountData} />
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full gap-4 ">
          <OverviewCard data={[{title: "Current Balance", value: accountBalance, type: "balance"}]}/>
          <OverviewCard data={[{title: "Account Type", value: convertToTitleCase(accountData.account_type_name), type: "accType"}]}/>
          <OverviewCard data={[{title: "Total Income", value: positiveTransactionSum, type: "Income"}]}/>
          <OverviewCard data={[{title: "Total Expense", value: negativeTransactionSum, type: "Expense"}]}/>
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500">
        <h1 className={sectionHeaderStyling}>Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SimpleGraph accountData={accountData} transactionData={transactionData} />
          <SpendingPieChart />
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 border-gray-500 flex flex-col gap-4">
        <div className="flex w-full justify-between mb-2 items-center">
          <h1 className={sectionHeaderStyling}>Transactions</h1>
          {accountData.plaid_account_id ? (
            <SyncTransactionBtn accountData={accountData} />
          ) : (
            <AddTransactionBtn accountData={accountData} />
          )}
        </div>
        
        <div className="flex w-full">
          <div className="w-full md:w-4/5">
            <SearchBar placeholder={"Search by transaction name, amount, category, or date"} />
          </div>
          <div className="flex-1 hidden md:block">
            <OrderFilter filterOption={["", "Name", "Amount", "Category", "Date"]} />
          </div>
        </div>
        
        <TransactionsTable
          transactions={transactionData}
          accountType={accountData.plaid_account_id ? "auto" : "manual"}
        />
      </div>
    </main>
  );
}

