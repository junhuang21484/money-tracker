import connection from "./connector";

export function fetchUserByID( userID ) {
    connection.query(`SELECT * FROM Users WHERE user_id='${userID}'`, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error);
            return;
        }
        console.log('Query results:', results);
    });
}