import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import { fetchAccountByID } from "@/app/lib/data/accounts";
import Link from "next/link";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import TransactionsTable from "@/app/lib/ui/dashboard-account/transactions/transactions-table"

export default async function AccountTransaction({ params }) {
  const userID = getLoggedInUserID(getLoggedInUserID);
  const accountID = params.id;
  const accountData = await fetchAccountByID(accountID);

  if (userID != accountData.user_id) {
    return <div>User not permitted</div>;
  }

  return (
    <main className="w-full h-full bg-gray-950 flex flex-col gap-4 p-4">
      <h1 className="text-white text-2xl">Transactions</h1>
      <Link
        href={`/dashboard/accounts/${accountID}/details`}
        className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
        Back
      </Link>

      <TransactionsTable />
    </main>
  );
}