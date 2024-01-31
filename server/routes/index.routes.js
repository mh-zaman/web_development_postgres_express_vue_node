const express = require('express');
const user = require('./user.routes');
const auth = require('./auth.routes');
const router = express.Router();

router.use('/users', user);
router.use('/auth', auth);

module.exports = router;