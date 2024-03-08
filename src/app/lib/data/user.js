'use server'
import connection from "./connector";

export async function fetchUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length ? results[0] : null);
    });
  });
}

export async function fetchUserByID(userID) {

  const sql = `SELECT * FROM Users WHERE user_id=?`;
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

export async function insertNewUser(email, password, firstName, lastName, role) {
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

export async function fetchFirstNameByUserID(userID) {
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