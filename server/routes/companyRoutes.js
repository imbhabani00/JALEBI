const express = require('express');
const multer = require('multer');
const {
  createCompany,
  getCompanies,
  getCompanyById,
  sendInquiry,
  bulkUploadCompanies,
} = require('../controllers/companyController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/:id/inquiry', sendInquiry);
router.post('/bulk-upload', upload.single('file'), bulkUploadCompanies);

module.exports = router;
