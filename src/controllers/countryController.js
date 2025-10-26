const countryService = require('../services/countryService');
const refreshService = require('../services/refreshService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * POST /countries/refresh
 */
async function refreshCountries(req, res, next) {
    try {
        const result = await refreshService.refreshCountries();
        res.json(successResponse(result));
    } catch (error) {
        next(error);
    }
}

/**
 * GET /countries
 */
async function getAllCountries(req, res, next) {
    try {
        const countries = await countryService.getCountries(req.query);
        res.json(successResponse(countries));
    } catch (error) {
        next(error);
    }
}

/**
 * GET /countries/:name
 */
async function getCountryByName(req, res, next) {
    try {
        const country = await countryService.getCountryByName(req.params.name);

        if (!country) {
            return res.status(404).json(errorResponse('Country not found'));
        }

        res.json(successResponse(country));
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /countries/:name
 */
async function deleteCountry(req, res, next) {
    try {
        const deleted = await countryService.deleteCountryByName(req.params.name);

        if (!deleted) {
            return res.status(404).json(errorResponse('Country not found'));
        }

        res.json(successResponse({ message: 'Country deleted successfully' }));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    refreshCountries,
    getAllCountries,
    getCountryByName,
    deleteCountry
};