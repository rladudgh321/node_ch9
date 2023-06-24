const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { renderJoin, renderProfile, renderMain } = require('../controllers/page');

router.use((req,res,next)=>{
    res.locals.user = req.user || null;
    res.locals.followerCount = 0;
    res.locals.follwingCount = 0;
    res.locals.follwingIdList = [];
    next();
});

router.get('/join', isNotLoggedIn, renderJoin);
router.get('/profile', isLoggedIn, renderProfile);
router.get('/', renderMain);

module.exports = router;