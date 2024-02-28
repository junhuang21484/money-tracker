import connection from "./connector";

export default function fetchUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      console.log('User object:', results[0]);
      resolve(results.length ? results[0] : null);
    });
  });
}

export function fetchUserByID( userID ) {
    connection.query(`SELECT * FROM Users WHERE user_id='${userID}'`, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error);
            return;
        }
        console.log('Query results:', results);
    });
}