import { Router } from 'express';
import upload from '../config/multerUpload.js';
import {
  createReport,
  getAllReports,
  getReportById,
} from '../controllers/reportsController.js';

const router = Router();

// POST /reports
// Use multipart/form-data with field name `image` to upload an image.
router.post('/reports', upload.single('image'), createReport);

router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);

export default router;
