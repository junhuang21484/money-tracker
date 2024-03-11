'use server'

import connection from "./connector";

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
  
  
  

  
