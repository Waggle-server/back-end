const express = require('express');
const router = express.Router();

const noticeCtrl = require('../controller/noticeCtrl');

const multer  = require("../middleware/multer");



// ?search={검색어} &page
router.get('/', noticeCtrl.noticeList(0, 1));
router.get('/qna', noticeCtrl.noticeList(5, 5));

router.get('/read/:num', noticeCtrl.noticeRead);




// get - 관리자페이지 view
// post - db 넘기기

router.get('/create', noticeCtrl.getNoticeCreate);
router.post('/create', 
    multer.upload('notice').single('img'),
    noticeCtrl.postNoticeCreate
);

router.get('/update/:num', noticeCtrl.getNoticeUpdate);
router.post('/update/:num', noticeCtrl.postNoticeUpdate);

router.post('/delete', noticeCtrl.noticeDelete);



module.exports = router;

