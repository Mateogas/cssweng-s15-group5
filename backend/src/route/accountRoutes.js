// src/route/accountRoutes.js

const express = require('express');
const router = express.Router();

const { createAccount } = require('../controller/createAccountController');

router.post('/create-account', createAccount);

module.exports = router;
