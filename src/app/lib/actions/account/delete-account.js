'use server'
import { fetchPlaidAccountInfoByPlaidAccId, deletePlaidAccountInfoByID, fetchPlaidAccountRelatedToItemID } from "@/app/lib/data/plaidAccountInfo"
import { deleteAccountByID } from "@/app/lib/data/accounts"
import { fetchPlaidConnectionByItemId, deletePlaidConnectionByAccessToken } from "@/app/lib/data/plaidConnections"
import { deleteTransactionsToAccountID } from "@/app/lib/data/transactions"
import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { removePlaidItem } from "@/app/lib/plaid/plaid-wrapper"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export default async function deleteAccount(accountData) {
    const loggedInUser = getLoggedInUserID()
    // User not logged in or account is not their
    if (!loggedInUser || loggedInUser != accountData.user_id) return {success: false, msg: "Unauthorized"}
    try {
        await deleteAccountByID(loggedInUser, accountData.account_id) // Remove account
        await deleteTransactionsToAccountID(accountData.account_id) // Remove transactions related to account

        // Check if this is a plaid account
        const plaidAccountId = accountData.plaid_account_id
        if (plaidAccountId) {
            const plaidAccountInfo = await fetchPlaidAccountInfoByPlaidAccId(plaidAccountId)
            const itemId = plaidAccountInfo.item_id
            await deletePlaidAccountInfoByID(plaidAccountId) // Remove plaid account info

            const relatedPlaidAccounts = await fetchPlaidAccountRelatedToItemID(itemId) // Get all related account
            if (relatedPlaidAccounts.length === 0) { // Deactivate plaid connections since all related plaid accounts has been deleted
                console.log("Triggered")
                const plaidConnection = await fetchPlaidConnectionByItemId(itemId, loggedInUser)
                const accessToken = plaidConnection.access_token
                removePlaidItem(accessToken) // Deactivate plaid connection
                await deletePlaidConnectionByAccessToken(accessToken, loggedInUser) // Remove plaid connection from database
            }
        }

        revalidatePath("/dashboard/accounts")
        return {success: true, msg: `Account delete`}
    } catch (error) {
        console.log(error)
        return {success: false, msg: "Server Error"}
    } finally {
        redirect("/dashboard/accounts")
    }
}