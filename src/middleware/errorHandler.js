const { errorResponse } = require('../utils/responseFormatter');

/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    // External API errors (503)
    if (err.message && err.message.includes('Could not fetch data from')) {
        return res.status(503).json(
            errorResponse('External data source unavailable', err.message)
        );
    }

    // Default to 500
    res.status(500).json(
        errorResponse('Internal server error')
    );
}

module.exports = errorHandler;