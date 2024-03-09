'use server'
import connection from "./connector";

export async function fetchAccTypeToUser(userID) {
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

export async function fetchAccTypeToUserByName(userID, name) {
    const sql = `SELECT * FROM accountTypes WHERE (user_id='DEFAULT' OR user_id=?) AND name=?`;
    const values = [userID, name];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            
            resolve(results[0]);
        });
    });
}

export async function fetchAccTypeByID(accountTypeID,) {
    const sql = `SELECT * FROM accountTypes WHERE account_type_id=?`;
    const values = [accountTypeID];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            
            resolve(results[0]);
        });
    });
}