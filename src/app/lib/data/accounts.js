import connection from "./connector";

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