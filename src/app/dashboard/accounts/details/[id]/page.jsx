'use server'

import { fetchAccountByID } from "@/app/lib/data/accounts";
import OverviewCard from "@/app/lib/ui/dashboard-account/details/overview-card"
import AccountNameEdit from "@/app/lib/ui/dashboard-account/details/account-name-edit"
import { formatCurrency, convertToTitleCase } from "@/app/lib/utils";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function AccountDetails({ params }) {
    const accountID = params.id
    const accountData = await fetchAccountByID(accountID)
    const accountBalance = formatCurrency(accountData.balance)

    return (
        <main className="w-full h-full bg-gray-950 text-white flex flex-col gap-4 p-4">
            <Link 
                href="/dashboard/accounts"
                className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
            >
                <ArrowLeftStartOnRectangleIcon className="w-6 h-6"/>
                Back
            </Link>
            
            <AccountNameEdit accountName={accountData.name} />

            <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-4">
                <OverviewCard title="Current Balance" value={accountBalance} type="balance" />
                <OverviewCard title="Account Type" value={convertToTitleCase(accountData.account_type_name)} type="accType"/>
                <OverviewCard title="Total Income" value={"TBD"} type="income" />
                <OverviewCard title="Total Expense" value={"TBD"} type="expense" />
            </div>
            
        </main>
    );
}
