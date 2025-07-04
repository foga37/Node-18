// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // від Render
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
