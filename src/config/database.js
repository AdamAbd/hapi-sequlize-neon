// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Memuat variabel dari .env

// Menggunakan DATABASE_URL dari environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Mungkin perlu diatur true di lingkungan produksi, tergantung konfigurasi Neon
    }
  },
  logging: false // Set ke console.log untuk melihat query SQL
});

module.exports = sequelize;
