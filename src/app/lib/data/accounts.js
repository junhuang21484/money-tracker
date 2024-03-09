'use server'
import connection from "./connector";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAccountByID(accountID) {
    const sql = `
    SELECT accounts.*, accType.name as account_type_name
    FROM accounts
    JOIN accountTypes as accType
    ON accounts.account_type_id = accType.account_type_id
    WHERE account_id = ?
    `;
    const values = [accountID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    });
}

export async function fetchAccountByUserAndPlaidID(userID, plaidPersistentAccID) {
    const sql = `SELECT * FROM accounts WHERE user_id = ? AND plaid_persistent_acc_id = ?`;
    const values = [userID, plaidPersistentAccID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    });
}

export async function fetchFilteredAccounts(userID, query, orderBy, filterDirection) {
    noStore();
    const acceptedOrderBy = ["Name", "Balance"]
    let sql = `
    SELECT accounts.*, accountTypes.name AS account_type_name FROM accounts
    JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
    WHERE
        accounts.user_id=? AND
        (accounts.name LIKE ? OR
        CAST(accounts.balance AS CHAR) LIKE ? OR
        accountTypes.name LIKE ?)
    `;
    const values = [userID, `%${query}%`, `%${query}%`, `%${query}%`];

    if (orderBy && acceptedOrderBy.includes(orderBy)) {
        sql += `\nORDER BY accounts.${orderBy} ${filterDirection === "ASC" || filterDirection === "DESC" ? filterDirection : ""}`
    }

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

export async function updateAccountName(accountID, newName) {
    const sql = `UPDATE accounts SET name=? WHERE account_id=?`;
    const values = [newName, accountID];

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

export async function insertNewAccount(userID, accountTypeID, plaidPersistentAccID, name, balance) {
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