const express = require('express');
const router = express.Router();

const noticeCtrl = require('../controller/noticeCtrl');

const { noticeUpload } = require("../middleware/multer");



router.get('/', noticeCtrl.noticeList);
router.get('/qna', noticeCtrl.qnaList);
router.get('/read/:num', noticeCtrl.noticeRead);


// get - 관리자페이지 view
// post - db 넘기기

router.get('/create', noticeCtrl.getNoticeCreate);
router.post('/create', 
    noticeUpload.single('img'),
    noticeCtrl.postNoticeCreate
);

router.get('/update/:num', noticeCtrl.getNoticeUpdate);
router.post('/update/:num', noticeCtrl.postNoticeUpdate);

router.post('/delete', noticeCtrl.noticeDelete);



module.exports = router;