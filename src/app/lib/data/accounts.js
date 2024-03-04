import connection from "./connector";
import { unstable_noStore as noStore } from 'next/cache';

export function fetchAccountByUserID(userID) {
    const sql = `SELECT * FROM accounts WHERE user_id = ?`;
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

export async function fetchFilteredAccounts(userID, query) {
    noStore();
    const sql = `
    SELECT accounts.*, accountTypes.name AS account_type_name FROM accounts
    JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
    WHERE
        accounts.user_id=? AND
        (accounts.name LIKE ? OR
        CAST(accounts.balance AS CHAR) LIKE ? OR
        accountTypes.name LIKE ?)
    `;
    const values = [userID, `%${query}%`, `%${query}%`, `%${query}%`];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                console.log(error)
                return reject(error);
            }

            resolve(results);
        });
    });
}

export function insertNewAccount(userID, accountTypeID, plaidPersistentAccID, name, balance) {
    const sql = `INSERT INTO accounts (account_id, user_id, account_type_id, plaid_persistent_acc_id, name, balance) VALUES (UUID(), ?, ?, ?, ?, ?)`;
    const values = [userID, accountTypeID, plaidPersistentAccID, name, balance];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}