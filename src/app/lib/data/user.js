import connection from "./connector";

export function fetchUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length ? results[0] : null);
    });
  });
}

export function fetchUserByID( userID ) {
    connection.query(`SELECT * FROM Users WHERE user_id='${userID}'`, (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error);
            return;
        }
        console.log('Query results:', results);
    });
}

export function insertNewUser(email, password, firstName, lastName, role) {
  const sql = `INSERT INTO Users (user_id, email, password, first_name, last_name, role) VALUES (UUID(), ?, ?, ?, ?, ?)`;
  const values = [email, password, firstName, lastName, "unverified_user"];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
}

export function fetchFirstNameByUserID(userID) {
  const sql = `SELECT first_name FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              return reject(error);
          }
          const first_name = results[0]?.first_name;
          resolve(first_name);
      });
  });
}