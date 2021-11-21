const express = require('express');
const v1 = require('./routes/v1');

const router = express.Router();

/**
 * Route v1
 */
router.use('/v1', v1);

module.exports = router;
