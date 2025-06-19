const express = require('express');
const { loginAdmin } = require('../controllers/authcontroller');
const router = express.Router();

router.post('/login', loginAdmin);

module.exports = router;