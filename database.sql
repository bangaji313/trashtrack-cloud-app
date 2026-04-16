CREATE TABLE IF NOT EXISTS laporan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    foto_url VARCHAR(500) NOT NULL,
    status ENUM('Menunggu', 'Dikerjakan', 'Diangkut') DEFAULT 'Menunggu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);