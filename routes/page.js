const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { renderJoin, renderProfile, renderMain, renderHashtag } = require('../controllers/page');

router.use((req,res,next)=>{
    res.locals.user = req.user || null;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f=>f.id) || [];
    next();
});

router.get('/join', isNotLoggedIn, renderJoin);
router.get('/profile', isLoggedIn, renderProfile);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag);

module.exports = router;