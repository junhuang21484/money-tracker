'use server'
import {insertNewAccount} from "@/app/lib/data/accounts"
import { revalidatePath } from "next/cache"

export default async function createNewManualAccount(userID, prevState, formData) {
    try {
        await insertNewAccount(userID, formData.get("accountType"), null, formData.get("accountName"), formData.get("accountBalance"))
        revalidatePath("/dashboard/accounts")
        return {success: true, msg: `Account ${formData.get("accountName")} created`}
    } catch (error) {
        console.log(error.message)
        return {success: false, msg: "Server Error"}
    }
}