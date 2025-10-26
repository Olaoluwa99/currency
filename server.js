const app = require('./src/app');
const { PORT } = require('./src/config/constants');

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});