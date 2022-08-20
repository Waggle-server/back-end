const express = require('express');
const router = express.Router();

const adminCtrl = require('../controller/adminCtrl');

const multer  = require("../middleware/multer");


// login
router.get('/login', adminCtrl.login);
router.post('/login/process', adminCtrl.login_process);
router.get('/login/logout', adminCtrl.logout_process)


// manage
router.get('/manage/user', adminCtrl.manage_user);
router.get('/manage/user/list', adminCtrl.manage_user_list);

router.get('/manage/guest', adminCtrl.manage_guest);
router.get('/manage/guest/place', adminCtrl.manage_gp);
router.get('/manage/guest/place/list', adminCtrl.manage_gp_list);
router.get('/manage/guest/place/read/:gp_key', adminCtrl.manage_gp_read);
router.get('/manage/guest/place/delete/:gp_key', adminCtrl.manage_gp_delete);
router.get('/manage/guest/place/accept/:gp_key', adminCtrl.manage_gp_accept);


router.get('/manage/guest/book', adminCtrl.manage_gb);
router.get('/manage/guest/book/list', adminCtrl.manage_gb_list);
router.get('/manage/guest/book/read/:gb_key', adminCtrl.manage_gb_read);
router.get('/manage/guest/book/delete/:gb_key', adminCtrl.manage_gb_delete);


router.get('/manage/notice', adminCtrl.manage_notice);
router.get('/manage/notice/qna', adminCtrl.manage_notice_qna);
router.get('/manage/notice/qna/list', adminCtrl.manage_notice_qna_list);
router.get('/manage/notice/qna/read/:qna_key', adminCtrl.manage_notice_qna_read);
router.post('/manage/notice/qna/answer/:qna_key', adminCtrl.manage_notice_qna_answer_process);

router.get('/manage/notice/notice', adminCtrl.manage_notice_notice);
router.get('/manage/notice/notice/list', adminCtrl.manage_notice_notice_list);
router.get('/manage/notice/notice/create', adminCtrl.manage_notice_notice_create);
router.post('/manage/notice/notice/create', 
    multer.upload('notice').single('img'),
    adminCtrl.manage_notice_notice_create_process
);
router.get('/manage/notice/notice/read/:notice_key', adminCtrl.manage_notice_notice_read);
router.get('/manage/notice/notice/update/:notice_key', adminCtrl.manage_notice_notice_update);
router.post('/manage/notice/notice/update/:notice_key', adminCtrl.manage_notice_notice_update_process);
router.get('/manage/notice/notice/delete/:notice_key', adminCtrl.manage_notice_notice_delete);


router.get('/', adminCtrl.main);




// ?=search & page
// router.get('/notice', adminCtrl.notice);

// router.get('/read/:num', adminCtrl.noticeRead);

module.exports = router;