const mysql = require('mysql2/promise');
const { DATABASE } = require('../src/config/constants');

async function initDatabase() {
    let connection;

    try {
        // Connect without database
        connection = await mysql.createConnection({
            host: DATABASE.HOST,
            user: DATABASE.USER,
            password: DATABASE.PASSWORD,
            port: DATABASE.PORT
        });

        console.log('Connected to MySQL server');

        // Create database if not exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE.DATABASE}`);
        console.log(`✅ Database '${DATABASE.DATABASE}' created or already exists`);

        // Use the database
        await connection.query(`USE ${DATABASE.DATABASE}`);

        // Create countries table
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS countries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        capital VARCHAR(255),
        region VARCHAR(255),
        population BIGINT NOT NULL,
        currency_code VARCHAR(10),
        exchange_rate DECIMAL(15, 4),
        estimated_gdp DECIMAL(20, 2),
        flag_url VARCHAR(500),
        last_refreshed_at DATETIME,
        UNIQUE KEY unique_name (name),
        INDEX idx_region (region),
        INDEX idx_currency (currency_code),
        INDEX idx_gdp (estimated_gdp)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

        await connection.query(createTableQuery);
        console.log('✅ Table "countries" created or already exists');

        console.log('\n🎉 Database initialization completed successfully!');

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

initDatabase();