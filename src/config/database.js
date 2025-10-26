const mysql = require('mysql2/promise');
const { DATABASE } = require('./constants');

const pool = mysql.createPool({
    host: DATABASE.HOST,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.DATABASE,
    port: DATABASE.PORT,
    waitForConnections: true,
    connectionLimit: DATABASE.CONNECTION_LIMIT,
    queueLimit: 0
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

module.exports = pool;