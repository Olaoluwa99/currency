const { GDP_MULTIPLIER } = require('../config/constants');

/**
 * Generate a random multiplier between min and max
 */
function getRandomMultiplier() {
    return Math.random() * (GDP_MULTIPLIER.MAX - GDP_MULTIPLIER.MIN) + GDP_MULTIPLIER.MIN;
}

/**
 * Calculate estimated GDP
 * Formula: population × random(1000–2000) ÷ exchange_rate
 */
function calculateEstimatedGDP(population, exchangeRate) {
    if (!population || !exchangeRate) {
        return null;
    }

    const multiplier = getRandomMultiplier();
    return (population * multiplier) / exchangeRate;
}

module.exports = {
    getRandomMultiplier,
    calculateEstimatedGDP
};