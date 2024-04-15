'use server'

import { deleteGoalById, deleteGoalAccountByGoalId } from "@/app/lib/data/goals";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken"
import { revalidatePath } from "next/cache";

export default async function deleteGoal(goalData) {
    try {
        const loggedInUser = await getLoggedInUserID()
        if (!loggedInUser || loggedInUser != goalData.user_id) return { success: false, msg: "Unauthorized" }

        await deleteGoalById(goalData.goal_id)
        await deleteGoalAccountByGoalId(goalData.goal_id)

        revalidatePath("/dashboard")
        return { success: true, msg: "Goal deleted successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, msg: "Internal server error" }
    }

}
