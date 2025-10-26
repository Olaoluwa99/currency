const externalApiService = require('./externalApiService');
const countryService = require('./countryService');
const imageService = require('./imageService');

/**
 * Refresh all countries data
 */
async function refreshCountries() {
    try {
        // Fetch data from external APIs
        const [countries, exchangeRates] = await Promise.all([
            externalApiService.fetchCountries(),
            externalApiService.fetchExchangeRates()
        ]);

        // Process and upsert each country
        const promises = countries.map(country => {
            const processedData = countryService.processCountryData(country, exchangeRates);
            return countryService.upsertCountry(processedData);
        });

        await Promise.all(promises);

        // Generate summary image
        await imageService.generateSummaryImage();

        return {
            success: true,
            countries_processed: countries.length
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    refreshCountries
};