const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/verify.js');

router.use(verifyToken);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;