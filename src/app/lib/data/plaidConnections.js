import connection from "./connector";

export function insertNewPlaidConnection(itemID, accessToken, userID, institutionName) {
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