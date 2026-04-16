import multer from 'multer';

// Store file in memory (buffer) so we can upload directly to S3.
// Nothing is saved to local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;
