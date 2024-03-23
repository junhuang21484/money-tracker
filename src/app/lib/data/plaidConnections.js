'use server'
import connection from "./connector";

export async function getPlaidConnectionByInstitutionName(userID, institutionName) {
  const sql = `SELECT * FROM plaidConnections WHERE user_id=? AND institution_name=?`;
  const values = [userID, institutionName];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  })
}

export async function fetchPlaidConnectionByItemId(itemID, userID) {
  const sql = `SELECT * FROM plaidConnections WHERE item_id=? AND user_id=? `;
  const values = [itemID, userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  })
}

export async function insertNewPlaidConnection(itemID, accessToken, userID, institutionName) {
  const sql = `INSERT INTO plaidConnections (item_id, access_token, user_id, institution_name, transaction_cursor) VALUES (?, ?, ?, ?, ?)`;
  const values = [itemID, accessToken, userID, institutionName, null];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}

export async function updatePlaidTransactionCursor(itemId, newCursor) {
  const sql = `UPDATE plaidConnections SET transaction_cursor = ? WHERE item_id = ?`;
  const values = [newCursor, itemId];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}

export async function deletePlaidConnectionByAccessToken(accessToken, userID) {
  const sql = `DELETE FROM plaidConnections WHERE access_token=? AND user_id=?`;
  const values = [accessToken, userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  })
}