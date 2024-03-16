'use server'

import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { fetchPlaidAccountInfoByPlaidAccId, fetchPlaidAccountRelatedToItemID } from "@/app/lib/data/plaidAccountInfo"
import { updateAccountBalanceByPlaidAccountID } from "@/app/lib/data/accounts"
import { fetchPlaidConnectionByItemId, updatePlaidTransactionCursor } from "@/app/lib/data/plaidConnections"
import { insertNewTransaction, updateTransactionFromPlaid, deleteTransactionByPlaid } from "@/app/lib/data/transactions"
import { getAccountLinkedUncached } from "@/app/lib/plaid/plaid-wrapper"
import { fetchNewSyncData } from "@/app/lib/plaid/plaid-wrapper"
import { revalidatePath } from "next/cache"

class SimpleTransaction {
    constructor(
        plaidTransactionId,
        userId,
        accountId,
        category,
        date,
        name,
        amount,
    ) {
        this.plaidTransactionId = plaidTransactionId
        this.userId = userId
        this.accountId = accountId
        this.category = category
        this.date = date
        this.name = name
        this.amount = amount
    }

    static fromPlaidTransaction(txnObj, userId) {
        return new SimpleTransaction(
            txnObj.transaction_id,
            userId,
            txnObj.account_id,
            txnObj.personal_finance_category.primary,
            txnObj.date,
            txnObj.merchant_name ?? txnObj.name,
            txnObj.amount
        )
    }
}

export default async function syncTransactions(accountData) {
    try {
        const loggedInUser = getLoggedInUserID()
        if (!loggedInUser || (loggedInUser != accountData.user_id)) return { success: false, msg: "Unauthorized user" }

        const plaidAccountInfo = await fetchPlaidAccountInfoByPlaidAccId(accountData.plaid_account_id)
        if (!plaidAccountInfo) return { success: false, msg: "Only plaid account can sync transaction(s)" }

        const plaidConnectionInfo = await fetchPlaidConnectionByItemId(plaidAccountInfo.item_id, loggedInUser)
        if (!plaidConnectionInfo) return { success: false, msg: "Connection for this account has been removed" }

        const newTransactions = await fetchNewSyncData(plaidConnectionInfo.access_token, plaidConnectionInfo.transaction_cursor)
        if (!newTransactions.success) return { success: false, msg: "Error during fetching new transactions, please try again later" }

        // Get all plaid_account_id related to this item_id and map it to the account_id
        const allRelatedAccount = await fetchPlaidAccountRelatedToItemID(plaidConnectionInfo.item_id)
        const plaidToAccountMap = {}
        allRelatedAccount.forEach(accountInfo => {
            const { plaid_account_id, account_id } = accountInfo
            plaidToAccountMap[plaid_account_id] = {
                account_id
            }
        })
        const summary = { added: 0, removed: 0, modified: 0 }

        // Handle added transactions
        await Promise.all(
            newTransactions.added.map(async (txnObj) => {
                const transObj = SimpleTransaction.fromPlaidTransaction(txnObj, loggedInUser)
                const accInfo = plaidToAccountMap[transObj.accountId]
                const result = await insertNewTransaction(accInfo['account_id'], transObj.name, transObj.amount, transObj.category, transObj.date, transObj.plaidTransactionId)
                await new Promise(resolve => setTimeout(resolve, 1000))
                if (result) summary.added += 1
            })
        )

        // Handle modified transaction
        await Promise.all(
            newTransactions.modified.map(async (txnObj) => {
                const transObj = SimpleTransaction.fromPlaidTransaction(txnObj, loggedInUser)
                const result = await updateTransactionFromPlaid(transObj, transObj.plaidTransactionId)
                if (result) summary.modified += 1
            })
        )

        // Handle deleted transaction
        await Promise.all(
            newTransactions.modified.map(async (txnObj) => {
                const transObj = SimpleTransaction.fromPlaidTransaction(txnObj, loggedInUser)
                const result = await deleteTransactionByPlaid(transObj.plaidTransactionId)
                if (result) summary.removed += 1
            })
        )

        // Save the cursor
        await updatePlaidTransactionCursor(plaidConnectionInfo.item_id, newTransactions.nextCursor)
        
        // Update balance
        const accountDataPlaid = await getAccountLinkedUncached(plaidConnectionInfo.access_token)
        const accounts = accountDataPlaid['accounts']
        await Promise.all(
            accounts.map(async (account) => {
                await updateAccountBalanceByPlaidAccountID(account.account_id, account.balances.current)
            })
        )

        revalidatePath('/dashboard/accounts')
        return { success: true, msg: `Transaction Synced:\nAdded: ${summary.added}\nModified: ${summary.modified}\nRemoved: ${summary.removed}` }
    }
    catch (error) {
        console.log(error)
        return { success: false, msg: "Internal server error, please try again" }
    }
}