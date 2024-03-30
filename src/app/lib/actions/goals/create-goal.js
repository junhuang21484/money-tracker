'use server'

import { v4 as uuidv4 } from 'uuid';
import { insertNewGoal, insertNewGoalAccounts } from "@/app/lib/data/goals"

export async function createGoal(userId, prevState, formData) {
    try {
        const goalName = formData.get('goalName')
        const goalAmt = formData.get('goalAmount')
        const relatedAcc = formData.getAll('accounts')
        const goalId = uuidv4()
        await insertNewGoal(goalId, userId, goalName, goalAmt)
        await insertNewGoalAccounts(goalId, relatedAcc);

        return { success: true, msg: "Goal created successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, msg: "Internal Server Error" }
    }

}