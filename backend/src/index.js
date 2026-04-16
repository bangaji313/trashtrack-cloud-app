import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import reportsRoutes from './routes/reportsRoutes.js';
import { testDbConnection } from './config/db.js';

dotenv.config();

const app = express();

// Global middleware
app.use(cors());

// Parse JSON bodies (application/json)
app.use(express.json());

// Parse urlencoded bodies (application/x-www-form-urlencoded)
// NOTE: multipart/form-data is handled by multer at the route level.
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// API routes
app.use(reportsRoutes);

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await testDbConnection();
    console.log('✅ Connected to MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
