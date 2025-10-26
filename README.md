# Country Currency & Exchange API

A RESTful API that fetches country data from external APIs, stores it in MySQL, and provides CRUD operations with exchange rate calculations.

## Features

- Fetch and cache country data with exchange rates
- Calculate estimated GDP for each country
- Filter countries by region or currency
- Sort countries by GDP
- Generate summary images showing top countries
- RESTful endpoints with proper error handling

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Olaoluwa99/currency
cd currency
```

2. Install dependencies:
```bash
npm install
```

3. Configure database credentials in `src/config/constants.js`:
```javascript
DATABASE: {
  HOST: 'localhost',
  USER: 'your_mysql_user',
  PASSWORD: 'your_mysql_password',
  DATABASE: 'country_currency_db',
  PORT: 3306,
  CONNECTION_LIMIT: 10
}
```

4. Initialize the database:
```bash
npm run init-db
```

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST /countries/refresh
Fetch all countries and exchange rates, then cache them in the database.

**Response:**
```json
{
  "success": true,
  "countries_processed": 250
}
```

### GET /countries
Get all countries from the database.

**Query Parameters:**
- `region` - Filter by region (e.g., `?region=Africa`)
- `currency` - Filter by currency code (e.g., `?currency=NGN`)
- `sort` - Sort by GDP (`?sort=gdp_desc` or `?sort=gdp_asc`)

**Example:**
```
GET /countries?region=Africa&sort=gdp_desc
```

### GET /countries/:name
Get a specific country by name.

**Example:**
```
GET /countries/Nigeria
```

### DELETE /countries/:name
Delete a country record.

**Example:**
```
DELETE /countries/Nigeria
```

### GET /status
Show total countries and last refresh timestamp.

**Response:**
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-22T18:00:00Z"
}
```

### GET /countries/image
Serve the generated summary image showing top 5 countries by GDP.

## Error Handling

The API returns consistent JSON error responses:

- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (external API failures)

**Example Error Response:**
```json
{
  "error": "Country not found"
}
```

## External APIs Used

- **REST Countries API**: https://restcountries.com/v2/all
- **Exchange Rate API**: https://open.er-api.com/v6/latest/USD

## Project Structure
```
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── models/          # Database queries
│   ├── middleware/      # Express middleware
│   ├── utils/           # Helper functions
│   └── routes/          # API routes
├── scripts/             # Database initialization
├── cache/               # Generated images
└── server.js            # Entry point
```

## Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **HTTP Client**: Axios
- **Image Generation**: node-canvas
- **Validation**: express-validator

## License

MIT
