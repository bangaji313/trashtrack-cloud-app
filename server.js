require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection Handling
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// AWS S3 Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Multer S3 Setup untuk Upload Foto
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        // acl: 'public-read', // Uncomment if bucket policy requires ACL
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'laporan/' + uniqueSuffix + '-' + file.originalname);
        }
    })
});

// Routes
// 1. Tampilkan Halaman Utama (Daftar Laporan & Form)
app.get('/', (req, res) => {
    db.query('SELECT * FROM laporan ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error("Database error:", err);
            // Default empty array jika error/tabel belum ada mencegah crash (hanya di render html)
            return res.render('index', { laporan: [], error: 'Gagal memuat data dari database.' });
        }
        res.render('index', { laporan: results, error: null });
    });
});

// 2. Submit Laporan Baru
app.post('/lapor', upload.single('foto'), (req, res) => {
    const { lokasi, deskripsi } = req.body;
    
    if (!req.file) {
        return res.status(400).send("Foto wajib diunggah.");
    }
    
    const fotoUrl = req.file.location; // URL public dari S3

    const query = 'INSERT INTO laporan (lokasi, deskripsi, foto_url, status) VALUES (?, ?, ?, ?)';
    db.query(query, [lokasi, deskripsi, fotoUrl, 'Menunggu'], (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).send("Gagal menyimpan laporan ke database.");
        }
        res.redirect('/');
    });
});

// 3. Update Status Laporan (Untuk Petugas)
app.post('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const query = 'UPDATE laporan SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error("Database update error:", err);
            return res.status(500).send("Gagal mengupdate status.");
        }
        res.redirect('/');
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server TrashTrack berjalan di http://localhost:${port}`);
});