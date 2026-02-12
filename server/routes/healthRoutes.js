const express = require('express');
const { buildSuccess } = require('../utils/response');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json(buildSuccess({ status: 'ok' }, 'OK'));
});

module.exports = router;
