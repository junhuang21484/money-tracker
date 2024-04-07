'use server'

import { deleteTransactionByID } from "@/app/lib/data/transactions"
import { fetchAccountByID, updateAccountBalance } from "@/app/lib/data/accounts"
import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { revalidatePath } from "next/cache"

export default async function deleteTransaction(transactionData) {
    try {
        const loggedInUser = await getLoggedInUserID()
        const relatedAccount = await fetchAccountByID(transactionData.account_id)
        if (!loggedInUser || loggedInUser != relatedAccount.user_id) return { success: false, msg: "Unauthorized" }

        await deleteTransactionByID(transactionData.transaction_id)

        const accountCreated = new Date(relatedAccount.created_at)
        const transactionCreated = new Date(transactionData.date)

        if (transactionCreated > accountCreated) {
            // [Removing + amount = Account Balance Goes Down | Removing - amount = Account Balance Goes Up]
            const newBalance = relatedAccount.balance - transactionData.amount
            await updateAccountBalance(relatedAccount.account_id, newBalance)
        }
        revalidatePath("/dashboard/accounts")

        return { success: true, msg: "Transaction Deleted" }
    } catch (error) {
        console.log(error)
        return { success: false, msg: "Internal Server Error" }
    }

}