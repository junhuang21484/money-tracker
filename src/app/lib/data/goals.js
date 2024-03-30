'use server'
import connection from "./connector";

export async function insertNewGoal(goalId, userId, name, amount) {
    const sql = `INSERT INTO goals (goal_id, user_id, name, target_amount) VALUES (?, ?, ?, ?)`;
    const values = [goalId, userId, name, amount];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

export async function insertNewGoalAccounts(goalId, relatedAcc) {
    const sql = 'INSERT INTO goal_accounts (goal_id, account_id) VALUES ?';
    const values = [relatedAcc.map(accountId => [goalId, accountId])]

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}