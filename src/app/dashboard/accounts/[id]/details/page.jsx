"use server";

import { fetchAccountByID } from "@/app/lib/data/accounts";
import { fetchTransactionsByAccount } from "@/app/lib/data/transactions";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import OverviewCard from "@/app/lib/ui/dashboard-account/details/overview-card";
import AccountNameEdit from "@/app/lib/ui/dashboard-account/details/account-name-edit";
import Link from "next/link";
import SimpleGraph from "@/app/lib/ui/dashboard-account/details/balance-graph";
import { formatCurrency, convertToTitleCase } from "@/app/lib/utils";
import {
  ArrowLeftStartOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  AddTransactionBtn,
  SyncTransactionBtn,
} from "@/app/lib/ui/dashboard-account/transactions/buttons";
import TransactionsTable from "@/app/lib/ui/dashboard-account/transactions/transactions-table";

export default async function AccountDetails({ params }) {
  const userID = getLoggedInUserID(getLoggedInUserID);
  const accountID = params.id;
  const accountData = await fetchAccountByID(accountID);
  if (!accountData) return <div>Account Not Found</div>;

  const accountBalance = formatCurrency(accountData.balance);
  const transactionData = await fetchTransactionsByAccount(accountID);

  if (userID != accountData.user_id) {
    return <div>User not permitted</div>;
  }

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

        <Link
          href={`/dashboard/accounts/${accountID}/transactions`}
          className="bg-blue-500 hover:bg-blue-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
        >
          <DocumentTextIcon className="w-6 h-6" />
          Transaction
        </Link>
      </div>

      <div className="rounded-lg border-2 p-4">
        <h1 className="text-2xl mb-2">Overview</h1>
        <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-4 ">
          <OverviewCard
            title="Current Balance"
            value={accountBalance}
            type="balance"
          />
          <OverviewCard
            title="Account Type"
            value={convertToTitleCase(accountData.account_type_name)}
            type="accType"
          />
          <OverviewCard title="Total Income" value={"TBD"} type="income" />
          <OverviewCard title="Total Expense" value={"TBD"} type="expense" />
        </div>
      </div>

      <div className="rounded-lg border-2 p-4">
        <h1 className="text-2xl mb-2">Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SimpleGraph accountData={accountData} />
        </div>
      </div>

      <div className="rounded-lg border-2 p-4">
        <div className="flex w-full justify-between mb-2">
          <h1 className="text-2xl">Transactions</h1>
          {accountData.plaid_account_id ? (
            <SyncTransactionBtn accountData={accountData} />
          ) : (
            <AddTransactionBtn accountData={accountData} />
          )}
        </div>
        <TransactionsTable
          transactions={transactionData}
          account_type={accountData.plaid_account_id ? "auto" : "manual"}
        />
      </div>
    </main>
  );
}

//left graph for balance over time
//right graph for expenses by category
