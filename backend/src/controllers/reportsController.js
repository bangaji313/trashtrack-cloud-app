import { pool } from '../config/db.js';
import s3 from '../config/s3.js';

// POST /reports
// Body (multipart/form-data or JSON): { title, description }
// File (optional): image
export async function createReport(req, res) {
  try {
    // Debug logs (helpful for multipart/form-data)
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const title = (req.body?.title || '').trim();
    const description = (req.body?.description || '').trim();

    // Simple validation
    if (!title || !description) {
      return res.status(400).json({ message: 'title and description are required' });
    }

    let imageUrl = null;

    // If a file is uploaded, upload it to S3 and store the public URL.
    if (req.file) {
      const bucketName = process.env.S3_BUCKET_NAME;

      if (!bucketName) {
        return res.status(500).json({ message: 'S3_BUCKET_NAME is not set' });
      }

      const key = `${Date.now()}-${req.file.originalname}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const data = await s3.upload(uploadParams).promise();
      imageUrl = data.Location; // public URL
    }

    await pool.query(
      'INSERT INTO reports (title, description, image_url) VALUES (?,?,?)',
      [title, description, imageUrl]
    );

    return res.status(201).json({ message: 'Report created with image' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /reports
export async function getAllReports(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description, image_url AS imageUrl, created_at AS createdAt FROM reports ORDER BY id DESC'
    );

    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// GET /reports/:id
export async function getReportById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT id, title, description, image_url AS imageUrl, created_at AS createdAt FROM reports WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
