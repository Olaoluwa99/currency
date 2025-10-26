const { body, validationResult } = require('express-validator');
const { validationErrorResponse } = require('../utils/responseFormatter');

/**
 * Validate country data (if needed for manual POST/PUT operations)
 */
const validateCountry = [
    body('name').notEmpty().withMessage('is required'),
    body('population').notEmpty().withMessage('is required').isNumeric().withMessage('must be a number'),
    body('currency_code').notEmpty().withMessage('is required')
];

/**
 * Handle validation errors
 */
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorResponse(errors.array()));
    }
    next();
}

module.exports = {
    validateCountry,
    handleValidationErrors
};