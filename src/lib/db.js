import mysql from 'mysql2/promise';

// Set up your database connection
const pool = mysql.createPool({
  host: 'localhost', // Wrap in quotes
  user: 'root',      // Wrap in quotes
  password: 'Password', // Ensure it's the correct password
  database: 'hotelbookin', // Wrap in quotes
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
