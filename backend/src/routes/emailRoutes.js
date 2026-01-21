const express = require('express');
const { sendContactEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/', sendContactEmail);

module.exports = router;
