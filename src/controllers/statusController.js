const countryService = require('../services/countryService');
const imageService = require('../services/imageService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * GET /status
 */
async function getStatus(req, res, next) {
    try {
        const status = await countryService.getStatus();
        res.json(successResponse(status));
    } catch (error) {
        next(error);
    }
}

/**
 * GET /countries/image
 */
async function getSummaryImage(req, res, next) {
    try {
        const imageExists = await imageService.summaryImageExists();

        if (!imageExists) {
            return res.status(404).json(errorResponse('Summary image not found'));
        }

        const imagePath = imageService.getSummaryImagePath();
        res.sendFile(imagePath);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getStatus,
    getSummaryImage
};