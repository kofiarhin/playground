const express = require('express');
const { createInquiry, listInquiries } = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', createInquiry);
router.get('/', listInquiries);

module.exports = router;
