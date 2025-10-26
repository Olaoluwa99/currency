const db = require('../config/database');

/**
 * Get all countries with optional filters and sorting
 */
async function getAllCountries(filters = {}) {
    let query = 'SELECT * FROM countries WHERE 1=1';
    const params = [];

    if (filters.region) {
        query += ' AND region = ?';
        params.push(filters.region);
    }

    if (filters.currency) {
        query += ' AND currency_code = ?';
        params.push(filters.currency);
    }

    if (filters.sort === 'gdp_desc') {
        query += ' ORDER BY estimated_gdp DESC';
    } else if (filters.sort === 'gdp_asc') {
        query += ' ORDER BY estimated_gdp ASC';
    }

    const [rows] = await db.execute(query, params);
    return rows;
}

/**
 * Get a country by name (case-insensitive)
 */
async function getCountryByName(name) {
    const query = 'SELECT * FROM countries WHERE LOWER(name) = LOWER(?)';
    const [rows] = await db.execute(query, [name]);
    return rows[0] || null;
}

/**
 * Insert a new country
 */
async function insertCountry(countryData) {
    const query = `
    INSERT INTO countries (
      name, capital, region, population, currency_code, 
      exchange_rate, estimated_gdp, flag_url, last_refreshed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        countryData.name,
        countryData.capital,
        countryData.region,
        countryData.population,
        countryData.currency_code,
        countryData.exchange_rate,
        countryData.estimated_gdp,
        countryData.flag_url,
        countryData.last_refreshed_at
    ];

    const [result] = await db.execute(query, params);
    return result.insertId;
}

/**
 * Update an existing country
 */
async function updateCountry(name, countryData) {
    const query = `
    UPDATE countries 
    SET capital = ?, region = ?, population = ?, currency_code = ?, 
        exchange_rate = ?, estimated_gdp = ?, flag_url = ?, last_refreshed_at = ?
    WHERE LOWER(name) = LOWER(?)
  `;

    const params = [
        countryData.capital,
        countryData.region,
        countryData.population,
        countryData.currency_code,
        countryData.exchange_rate,
        countryData.estimated_gdp,
        countryData.flag_url,
        countryData.last_refreshed_at,
        name
    ];

    const [result] = await db.execute(query, params);
    return result.affectedRows;
}

/**
 * Delete a country by name
 */
async function deleteCountry(name) {
    const query = 'DELETE FROM countries WHERE LOWER(name) = LOWER(?)';
    const [result] = await db.execute(query, [name]);
    return result.affectedRows;
}

/**
 * Get total count of countries
 */
async function getCountriesCount() {
    const query = 'SELECT COUNT(*) as count FROM countries';
    const [rows] = await db.execute(query);
    return rows[0].count;
}

/**
 * Get the last refresh timestamp
 */
async function getLastRefreshTimestamp() {
    const query = 'SELECT MAX(last_refreshed_at) as last_refreshed FROM countries';
    const [rows] = await db.execute(query);
    return rows[0].last_refreshed;
}

/**
 * Get top N countries by estimated GDP
 */
async function getTopCountriesByGDP(limit = 5) {
    const query = 'SELECT name, estimated_gdp FROM countries WHERE estimated_gdp IS NOT NULL ORDER BY estimated_gdp DESC LIMIT ?';
    const [rows] = await db.execute(query, [limit]);
    return rows;
}

module.exports = {
    getAllCountries,
    getCountryByName,
    insertCountry,
    updateCountry,
    deleteCountry,
    getCountriesCount,
    getLastRefreshTimestamp,
    getTopCountriesByGDP
};