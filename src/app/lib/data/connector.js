import { createConnection } from 'mysql2';

const connection = createConnection(process.env.DATABASE_URL)
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});

export default connection;
