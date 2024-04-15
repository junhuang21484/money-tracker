'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

export default async function Logout() {
    try {
        const storedCookies = cookies()
        if (storedCookies.get("token")) {
            storedCookies.delete("token")   
            revalidatePath("/")
        }
    } catch (error) {   
        console.log(error)
    } finally {
        redirect("/")
    }
}