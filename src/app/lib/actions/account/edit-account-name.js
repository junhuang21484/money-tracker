'use server'
import { updateAccountName } from "@/app/lib/data/accounts"
import { fetchAccountByID } from "@/app/lib/data/accounts"
import { revalidatePath } from "next/cache"

export default async function editAccountName(userID, accountID, newName) {
    const accountInfo = await fetchAccountByID(accountID)
    if (userID != accountInfo.user_id) return {} // Logged in user != account holder
    try {
        await updateAccountName(accountID, newName)
        revalidatePath("/dashboard/accounts")
    } catch (error) {
        console.log(error.message)
    }
}