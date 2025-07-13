const express = require('express');
const router = express.Router();
const { getProfile } = require('../controller/profileController');

const authenticateToken = (req, res, next) => {
    req.user = { id: 'REPLACE_WITH_VALID_ID' }; //just replace for testing
    next();
};

// Route definition only, logic is in controller
router.get('/', authenticateToken, getProfile);

module.exports = router;
