const countryModel = require('../models/countryModel');
const { calculateEstimatedGDP } = require('../utils/gdpCalculator');

/**
 * Process and prepare country data for database storage
 */
function processCountryData(country, exchangeRates) {
    const timestamp = new Date().toISOString();

    // Extract currency code
    let currencyCode = null;
    let exchangeRate = null;
    let estimatedGdp = null;

    if (country.currencies && country.currencies.length > 0) {
        currencyCode = country.currencies[0].code;

        // Find exchange rate for this currency
        if (exchangeRates[currencyCode]) {
            exchangeRate = exchangeRates[currencyCode];
            estimatedGdp = calculateEstimatedGDP(country.population, exchangeRate);
        }
    }

    // If no currencies, set GDP to 0 as per spec
    if (!country.currencies || country.currencies.length === 0) {
        estimatedGdp = 0;
    }

    return {
        name: country.name,
        capital: country.capital || null,
        region: country.region || null,
        population: country.population,
        currency_code: currencyCode,
        exchange_rate: exchangeRate,
        estimated_gdp: estimatedGdp,
        flag_url: country.flag || null,
        last_refreshed_at: timestamp
    };
}

/**
 * Upsert country (insert or update)
 */
async function upsertCountry(countryData) {
    const existingCountry = await countryModel.getCountryByName(countryData.name);

    if (existingCountry) {
        await countryModel.updateCountry(countryData.name, countryData);
    } else {
        await countryModel.insertCountry(countryData);
    }
}

/**
 * Get all countries with filters
 */
async function getCountries(query) {
    const filters = {};

    if (query.region) {
        filters.region = query.region;
    }

    if (query.currency) {
        filters.currency = query.currency;
    }

    if (query.sort) {
        filters.sort = query.sort;
    }

    return await countryModel.getAllCountries(filters);
}

/**
 * Get a single country by name
 */
async function getCountryByName(name) {
    return await countryModel.getCountryByName(name);
}

/**
 * Delete a country by name
 */
async function deleteCountryByName(name) {
    const country = await countryModel.getCountryByName(name);
    if (!country) {
        return false;
    }

    await countryModel.deleteCountry(name);
    return true;
}

/**
 * Get status information
 */
async function getStatus() {
    const totalCountries = await countryModel.getCountriesCount();
    const lastRefreshed = await countryModel.getLastRefreshTimestamp();

    return {
        total_countries: totalCountries,
        last_refreshed_at: lastRefreshed
    };
}

module.exports = {
    processCountryData,
    upsertCountry,
    getCountries,
    getCountryByName,
    deleteCountryByName,
    getStatus
};