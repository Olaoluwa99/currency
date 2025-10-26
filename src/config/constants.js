module.exports = {
    // Server Configuration
    PORT: 3000,
    NODE_ENV: 'production',

    // Database Configuration
    DATABASE: {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: 'daniel99',
        DATABASE: 'country_currency_db',
        PORT: 3306,
        CONNECTION_LIMIT: 10
    },

    // External APIs
    EXTERNAL_APIS: {
        COUNTRIES_URL: 'https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies',
        EXCHANGE_RATE_URL: 'https://open.er-api.com/v6/latest/USD',
        TIMEOUT: 10000
    },

    // GDP Calculation
    GDP_MULTIPLIER: {
        MIN: 1000,
        MAX: 2000
    },

    // Image Generation
    IMAGE: {
        CACHE_DIR: './cache',
        FILENAME: 'summary.png',
        WIDTH: 800,
        HEIGHT: 600,
        BACKGROUND_COLOR: '#1a1a2e',
        TEXT_COLOR: '#ffffff',
        ACCENT_COLOR: '#16213e'
    }
};