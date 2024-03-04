import connection from "./connector";

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
