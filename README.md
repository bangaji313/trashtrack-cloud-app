# ♻️ TrashTrack - Sistem Manajemen Persampahan

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 📖 Deskripsi Proyek
**TrashTrack** adalah sebuah Sistem Manajemen Persampahan berbasis web yang dirancang khusus untuk mewadahi pelaporan sampah liar. Aplikasi ini memfasilitasi dua kelompok pengguna utama:
- **Masyarakat (Pelapor):** Dapat melaporkan temuan sampah liar dengan menyertakan lokasi, deskripsi, dan foto bukti temuan.
- **Petugas / Admin Pemerintah:** Bertugas sebagai pengelola sistem yang memantau daftar pelaporan dan melakukan pembaruan status penanganan (seperti "Menunggu", "Dikerjakan", atau "Diangkut").

## 🏗️ Arsitektur Sistem

![Diagram Arsitektur](link-gambar-nanti-disini)

**Alur Arsitektur Cloud:**
1. Pengguna mengakses aplikasi melalui jaringan publik yang melewati **Internet Gateway**.
2. Aplikasi berjalan di dalam container Docker yang di-host pada server **AWS EC2** (berada di *Public Subnet*).
3. Data teks laporan (lokasi, deskripsi, status) disimpan di layanan **AWS RDS MySQL** (berada di *Private Subnet* demi keamanan akses data).
4. File foto bukti sampah yang diunggah pengguna disimpan secara terpisah di **AWS S3 Bucket** agar performa terukur dan tidak membebani server aplikasi.
5. Proses *deployment* dilakukan secara otomatis menggunakan **GitHub Actions** (CI/CD) setiap kali ada perubahan data masuk secara komit (push) pada *branch main*.

## 🚀 Stack Teknologi

| Kategori | Teknologi/Layanan |
|---|---|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS (Embedded JavaScript Templates), Bootstrap 5 |
| **Database** | MySQL (Disiapkan untuk AWS RDS) |
| **Cloud Provider** | Amazon Web Services (EC2, S3, RDS) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |

## 💻 Panduan Instalasi Lokal

Ikuti petunjuk di bawah ini untuk menjalankan proyek TrashTrack di dalam sistem komputasi (server/komputer) lokal Anda:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/bangaji313/trashtrack-cloud-app.git
   cd trashtrack-cloud-app
   ```
2. **Install dependensi:**
   ```bash
   npm install
   ```
3. **Konfigurasi Database Lokal:**
   - Buat sebuah database MySQL baru dengan nama `trashtrack`.
   - Jalankan keseluruhan perintah struktur SQL yang berada di dalam file `database.sql` ke dalam database yang baru dibuat tersebut.
4. **Setup Environment Variables (.env):**
   - Salin file `.env.example` ke file baru bernama `.env`:
     ```bash
     cp .env.example .env
     ```
   - Buka file `.env` di teks editor Anda dan isi nilai kredensial *(credentials)* yang sesuai baik itu koneksi MySQL (*Localhost/RDS*) maupun konfigurasi AWS S3 Bucket.
5. **Jalankan Aplikasi:**
   ```bash
   npm start
   # atau gunakan perintah berikut ini untuk mode development
   npm run dev
   ```
6. **Akses Aplikasi:** Buka browser dan arahkan alamat navigasi ke: `http://localhost:3000`

## 👨‍💻 Author
- **Nama:** Maulana Seno Aji Yudhantara
- **NRP:** 152022065
