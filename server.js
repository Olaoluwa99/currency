const app = require('./src/app');
const { PORT } = require('./src/config/constants');
const db = require('./src/config/database');

// Auto-initialize database on first run (for Railway)
async function initDatabaseIfNeeded() {
    try {
        const connection = await db.getConnection();

        // Check if table exists
        const [tables] = await connection.query("SHOW TABLES LIKE 'countries'");

        if (tables.length === 0) {
            console.log('📦 Creating countries table...');

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
            console.log('✅ Countries table created successfully!');
        } else {
            console.log('✅ Countries table already exists');
        }

        connection.release();
    } catch (error) {
        console.error('❌ Database initialization error:', error.message);
    }
}

// Initialize and start server
initDatabaseIfNeeded().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});


/*
const app = require('./src/app');
const { PORT } = require('./src/config/constants');

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});*/
