const express = require('express');
const router = express.Router();
const countryRoutes = require('./countryRoutes');

// Mount country routes
router.use('/', countryRoutes);

module.exports = router;