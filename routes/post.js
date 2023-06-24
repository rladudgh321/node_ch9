const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { isLoggedIn } = require('../middleware');
const fs = require('fs');
const { afterUploadImage, uploadPost } = require('../controllers/post');

try {
    fs.readdirSync('uploads');
} catch (err){
    console.error('uploads폴더가 없어서 생성합니다');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads/');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    limits:{fileSize:5*1024*1024},
});

const upload2 = multer();

router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);
router.post('/', isLoggedIn, upload2.none(), uploadPost)

module.exports = router;