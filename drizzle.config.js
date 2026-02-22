/** @type {import('drizzle-kit').Config} */
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  // Provide a clear message when env is missing
  console.warn('WARNING: DATABASE_URL is not set in environment; migrations will fail until it is configured.');
}

module.exports = {
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
};
