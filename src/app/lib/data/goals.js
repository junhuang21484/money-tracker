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

export async function deleteGoalAccountByAccountId(accountId) {
    const sql = 'DELETE FROM goal_accounts WHERE account_id = ?';
    const values = [accountId]

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}


export async function fetchGoalByUserID(userID) {
    const sql = `SELECT * FROM goals WHERE user_id = ?`;
    const values = [userID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}


export async function fetchGoalAccountByGoalId(goalId) {
    const sql = `SELECT * FROM goal_accounts WHERE goal_id = ?`;
    const values = [goalId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}
