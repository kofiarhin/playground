const express = require('express');
const { requireAuth } = require('@clerk/express');
const { syncUser } = require('../controllers/authController');

const router = express.Router();

router.post('/sync', requireAuth(), syncUser);

module.exports = router;
