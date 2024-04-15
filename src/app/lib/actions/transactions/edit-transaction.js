'use server'

import { updateTransactionById } from "@/app/lib/data/transactions"
import { fetchAccountByID, updateAccountBalance } from "@/app/lib/data/accounts"
import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { revalidatePath } from "next/cache"

export default async function editTransaction(transactionData, prevState, formData) {
    try {
        const loggedInUser = await getLoggedInUserID()
        const relatedAccount = await fetchAccountByID(transactionData.account_id)
        if (!loggedInUser || loggedInUser != relatedAccount.user_id) return { success: false, msg: "Unauthorized" }

        await updateTransactionById(transactionData.transaction_id, formData.get("name"), formData.get("amount"), formData.get("category"), formData.get("date"))

        const accountCreated = new Date(relatedAccount.created_at)
        const transactionCreated = new Date(transactionData.date)

        if (transactionCreated > accountCreated) {
            // [New Amount > old amount = balance goes up by difference | new amount < old amount = balance goes down by difference]
            const difference = parseFloat(formData.get("amount")) - transactionData.amount
            const newBalance = relatedAccount.balance + difference
            await updateAccountBalance(relatedAccount.account_id, newBalance)
        }

        revalidatePath("/dashboard/accounts")

        return { success: true, msg: "Transaction Edited Successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, msg: "Internal Server Error" }
    }

}