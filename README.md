# TrashTrack - Cloud-Based Waste Reporting System (Backend)

TrashTrack is a cloud-based waste reporting backend API. Users can create reports with a title/description and optionally upload an image that is stored in **AWS S3**. Report data is stored in **MySQL** (e.g., AWS RDS).

## Features
- Create waste reports (title, description)
- Upload report image to AWS S3 (stored as URL in database)
- List all reports
- Get report detail by ID
- Docker-ready backend

## Tech Stack
- Node.js (v18)
- Express.js
- MySQL (`mysql2`)
- AWS S3 (`aws-sdk`)
- Multer (memory storage)
- Docker

## Project Structure
```
backend/
  Dockerfile
  package.json
  .env.example
  src/
    index.js
    config/
      db.js
      s3.js
      multerUpload.js
    controllers/
      reportsController.js
    routes/
      reportsRoutes.js
```

## Environment Variables
Create a `.env` file in `backend/` (do **NOT** commit it). Use `.env.example` as a template.

Required variables:
```bash
PORT=3000

# MySQL
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=3306

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

## Database Setup
Create the `reports` table:
```sql
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Run Locally
```cmd
cd backend
npm install
npm run dev
```

## Run with Docker
```cmd
cd backend
docker build -t trashtrack-backend .
docker run --rm -p 3000:3000 --env-file .env trashtrack-backend
```

## API Endpoints
Base URL: `http://localhost:3000`

- `POST /reports` (multipart/form-data)
  - fields: `title`, `description`
  - file (optional): `image`
- `GET /reports`
- `GET /reports/:id`

## Author
Maulana Seno Aji Yudhantara
