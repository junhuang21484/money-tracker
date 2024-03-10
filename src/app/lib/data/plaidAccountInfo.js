'use server'
import connection from "./connector";

export async function fetchPlaidAccountInfoByPersistID(plaidPersistentAccID) {
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

export async function fetchPlaidAccountRelatedToItemID(itemId) {
  const sql = `
  SELECT PAI.plaid_acc_id, ACC.account_id, ACC.balance, ACC.created_at, ACC_T.is_depository from plaidAccountInfo as PAI
  JOIN accounts as ACC on PAI.plaid_persistent_acc_id = ACC.plaid_persistent_acc_id
  JOIN accountTypes as ACC_T on ACC.account_type_id = ACC_T.account_type_id
  WHERE PAI.item_id = ?
  `;
  const values = [itemId];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
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

