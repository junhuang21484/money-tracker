'use server'
import connection from "./connector";

export async function fetchPlaidAccountInfoByPlaidAccId(plaid_account_id) {
  const sql = `SELECT * FROM plaidAccountInfo WHERE plaid_account_id=?`;
  const values = [plaid_account_id];

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
  JOIN accounts as ACC on PAI.plaid_account_id = ACC.plaid_account_id
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


export async function insertNewPlaidAccountInfo(plaid_account_id, itemID) {
  const sql = `INSERT INTO plaidAccountInfo (plaid_account_id, item_id) VALUES (?, ?, ?)`;
  const values = [plaid_account_id, itemID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}

