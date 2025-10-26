/**
 * Format success response
 */
function successResponse(data) {
    return data;
}

/**
 * Format error response
 */
function errorResponse(message, details = null) {
    const response = { error: message };
    if (details) {
        response.details = details;
    }
    return response;
}

/**
 * Format validation error response
 */
function validationErrorResponse(errors) {
    const details = {};
    errors.forEach(error => {
        details[error.path] = error.msg;
    });

    return {
        error: 'Validation failed',
        details
    };
}

module.exports = {
    successResponse,
    errorResponse,
    validationErrorResponse
};