'use server'
import connection from "./connector";

export async function getPlaidAccountInfoByID(plaidPersistentAccID) {
  const sql = `SELECT * FROM plaidAccountInfo WHERE plaid_persistent_acc_id=?`;
  const values = [plaidPersistentAccID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results[0]);
    });
  })
}

export async function insertNewPlaidAccountInfo(plaidPersistentAccID, accountID, itemID) {
  const sql = `INSERT INTO plaidAccountInfo (plaid_persistent_acc_id, plaid_acc_id, item_id) VALUES (?, ?, ?)`;
  const values = [plaidPersistentAccID, accountID, itemID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}

