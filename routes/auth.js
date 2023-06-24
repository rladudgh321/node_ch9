const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { login, logout, join } = require('../controllers/auth');

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

module.exports = router;