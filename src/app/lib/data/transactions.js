'use server'

import connection from "./connector";
import { unstable_noStore as noStore } from 'next/cache';

export async function insertNewTransaction(accountID, name, amount, category, date, plaidTransactionId = null) {
    const sql = `INSERT INTO transactions (transaction_id, account_id, name, amount, category, date, plaid_transaction_id) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`;
    const values = [accountID, name, amount, category, date, plaidTransactionId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    })
}

export async function deleteTransactionByPlaid(plaidTransactionId) {
    const sql = `DELETE FROM transactions WHERE plaid_transaction_id=?`;
    const values = [plaidTransactionId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    })
}

export async function deleteTransactionsToAccountID(accountID) {
    const sql = `DELETE FROM transactions WHERE account_id=?`;
    const values = [accountID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

export async function deleteTransactionByID(transactionId) {
    const sql = `DELETE FROM transactions WHERE transaction_id=?`;
    const values = [transactionId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

export async function updateTransactionById(transactionId, name, amount, category, date) {
    const sql = `
    UPDATE transactions 
    SET name = ?, amount = ?, category = ?, date = ?
    WHERE transaction_id = ?
    `;
    const values = [name, amount, category, date, transactionId]

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(false);
            }

            resolve(true);
        });
    })
}

export async function updateTransactionFromPlaid(transactionObj, plaidTransactionId) {
    const sql = `
    UPDATE transactions 
    SET account_id = ?, name = ?, amount = ?, category = ?, date = ?
    WHERE plaid_transaction_id = ?
    `;
    const values = [
        transactionObj.accountId, transactionObj.name, transactionObj.amount,
        transactionObj.category, transactionObj.date, plaidTransactionId
    ];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(false);
            }

            resolve(true);
        });
    })
}

export async function fetchTransactionById(transactionId) {
    const sql = `SELECT * FROM transactions WHERE transaction_id=?`;
    const values = [transactionId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    })
}

export async function fetchTransactionsByAccount(accountID) {
    const sql = `SELECT * FROM transactions WHERE account_id=? ORDER BY date DESC`;
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

export async function fetchFilteredTransactions(accountID, query, orderBy, filterDirection) {
    noStore();

    const acceptedOrderBy = ["Name", "Date", "Category", "Amount"]
    let sql = `
    SELECT * from transactions
    WHERE
        account_id=? AND
        (name LIKE ? OR
        date LIKE ? OR
        category LIKE ? OR
        amount LIKE ?
        )
    `;
    const values = [accountID, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];

    if (orderBy && acceptedOrderBy.includes(orderBy)) {
        sql += `\nORDER BY ${orderBy} ${filterDirection === "ASC" || filterDirection === "DESC" ? filterDirection : ""}`
    } else {
        sql += '\nORDER by date DESC'
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


export async function fetchTransactionByPlaidTransID(plaidTransactionId) {
    const sql = `SELECT * FROM transactions WHERE plaid_transaction_id=?`;
    const values = [plaidTransactionId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    })
}

export async function getTransactionSummaryByAccountId(accountId) {
    const sql = `SELECT
                    account_id,
                    ROUND(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)) AS total_positive_amount,
                    ROUND(SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END)) AS total_negative_amount
                FROM
                    transactions
                WHERE
                    account_id = ?
                GROUP BY
                    account_id;`;
    const values = [accountId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    })
}

export async function getMonthlyBalanceChange(accountID) {
    const sql = `
      SELECT DATE_FORMAT(date, '%Y-%m-01') AS month_start,
             MAX(LAST_DAY(date)) AS month_end,
             ROUND(SUM(amount), 2) AS balance_change
      FROM transactions
      WHERE account_id = ?
      GROUP BY month_start
      ORDER BY month_start ASC
    `;
    const values = [accountID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

export async function fetchUserTransactions(userID) {
    const sql = `
        SELECT t.* 
        FROM transactions t
        JOIN accounts a ON t.account_id = a.account_id
        WHERE a.user_id = ?
        ORDER BY t.date DESC`;
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





