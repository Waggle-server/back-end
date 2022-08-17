const express = require('express');
const router = express.Router();

const adminCtrl = require('../controller/adminCtrl');


// login
router.get('/login', adminCtrl.login);
router.post('/login/process', adminCtrl.login_process);
router.get('/login/logout', adminCtrl.logout_process)


// manage
router.get('/manage/user', adminCtrl.manage_user);

router.get('/manage/guest', adminCtrl.manage_guest);
router.get('/manage/guest/place', adminCtrl.manage_guest_place);
router.get('/manage/guest/book', adminCtrl.manage_guest_book);


router.get('/', adminCtrl.main);




// ?=search & page
// router.get('/notice', adminCtrl.notice);

// router.get('/read/:num', adminCtrl.noticeRead);

module.exports = router;