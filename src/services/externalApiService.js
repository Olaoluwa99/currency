const axios = require('axios');
const { EXTERNAL_APIS } = require('../config/constants');

/**
 * Fetch all countries from REST Countries API
 */
async function fetchCountries() {
    try {
        const response = await axios.get(EXTERNAL_APIS.COUNTRIES_URL, {
            timeout: EXTERNAL_APIS.TIMEOUT
        });
        return response.data;
    } catch (error) {
        console.error('Countries API Error Details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status
        });
        if (error.code === 'ECONNABORTED') {
            throw new Error('Countries API request timed out');
        }
        throw new Error(`Could not fetch data from REST Countries API: ${error.message}`);
    }
}

/**
 * Fetch exchange rates from Exchange Rate API
 */
async function fetchExchangeRates() {
    try {
        const response = await axios.get(EXTERNAL_APIS.EXCHANGE_RATE_URL, {
            timeout: EXTERNAL_APIS.TIMEOUT,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        // The API returns rates directly in response.data.rates
        if (!response.data || !response.data.rates) {
            throw new Error('Invalid response format from Exchange Rate API');
        }

        return response.data.rates;
    } catch (error) {
        console.error('Exchange Rate API Error Details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status
        });

        if (error.code === 'ECONNABORTED') {
            throw new Error('Exchange Rate API request timed out');
        }
        throw new Error(`Could not fetch data from Exchange Rate API: ${error.message}`);
    }
}

module.exports = {
    fetchCountries,
    fetchExchangeRates
};