const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const statusController = require('../controllers/statusController');

// Refresh countries data
router.post('/countries/refresh', countryController.refreshCountries);

// Get summary image (must come before /:name to avoid route conflict)
router.get('/countries/image', statusController.getSummaryImage);

// Get all countries
router.get('/countries', countryController.getAllCountries);

// Get country by name
router.get('/countries/:name', countryController.getCountryByName);

// Delete country
router.delete('/countries/:name', countryController.deleteCountry);

// Get status
router.get('/status', statusController.getStatus);

module.exports = router;