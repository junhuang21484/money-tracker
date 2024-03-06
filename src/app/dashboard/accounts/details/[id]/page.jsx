'use server'

import { fetchAccountByID } from "@/app/lib/data/accounts";
import DetailCard from "@/app/lib/ui/dashboard/account/details/detail-card"
import { formatCurrency } from "@/app/lib/utils";

export default async function AccountDetails({ params }) {
    const accountID = params.id
    const accountData = await fetchAccountByID(accountID)
    const accountBalance = formatCurrency(accountData.balance)

    return (
        <main className="w-full h-full bg-gray-950 text-white flex flex-col gap-2">
            <h1 className="text-2xl">{accountData.name}</h1>

            <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-4 mt-4">
                <DetailCard title="Current Balance" value={accountBalance} type="balance" />
                <DetailCard title="Account Type" value={accountData.account_type_name} type="accType"/>
                <DetailCard title="Total Income" value={"TBD"} type="income" />
                <DetailCard title="Total Expense" value={"TBD"} type="expense" />
            </div>
            
        </main>
    );
}
