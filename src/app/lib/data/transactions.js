'use server'

import connection from "./connector";

export async function insertNewTransaction(accountID, name, amount, category, date) {
    const sql = `INSERT INTO transactions (transaction_id, account_id, name, amount, category, date) VALUES (UUID(), ?, ?, ?, ?, ?)`;
    const values = [accountID, name, amount, category, date];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    })
}

export async function fetchTransactionsByAccount(accountID) {
    const sql = `SELECT * FROM transactions WHERE account_Id=? ORDER BY date DESC`;
    const values = [accountID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    })
}
