'use server'
import { insertNewTransaction } from "@/app/lib/data/transactions"
import { updateAccountBalance } from "@/app/lib/data/accounts"
import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { revalidatePath } from "next/cache"

export default async function createNewTransaction(accountData, prevState, formData) {
    const loggedInUserID = getLoggedInUserID()
    if (loggedInUserID != accountData.user_id) return {success: false, msg: "Unauthorized"} // User not matching up with account owner

    const transactionName = formData.get('name')
    const transactionAmount = formData.get("amount")
    const transactionCategory = formData.get("category")
    const transactionDate = formData.get("date")
    try {
        const accountCreated = new Date(accountData.created_at);
        const transactionDateObj = new Date(transactionDate);

        await insertNewTransaction(accountData.account_id, transactionName, transactionAmount, transactionCategory, transactionDate)

        // Change the balance only if transaction is made after account creation
        if (transactionDateObj > accountCreated) {
            console.log("UPDATING BALANCE")
            const newBalance = accountData.balance + parseFloat(transactionAmount)
            await updateAccountBalance(accountData.account_id, newBalance)
        }

        revalidatePath('/dashboard/accounts')
        return { success: true, msg: "Transaction Created" }
    } catch (error) {
        console.log(error)
        return { success: false, msg: "Internal Server Error" }
    }
}
