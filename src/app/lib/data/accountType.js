import connection from "./connector";

export function fetchAccTypeToUser(userID) {
    const sql = `SELECT * FROM accountTypes WHERE user_id='DEFAULT' OR user_id = ?`;
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