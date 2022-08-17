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
router.get('/manage/guest/place', adminCtrl.manage_gp);
router.get('/manage/guest/place/list', adminCtrl.manage_gp_list);


router.get('/manage/guest/book', adminCtrl.manage_gb);


router.get('/', adminCtrl.main);




// ?=search & page
// router.get('/notice', adminCtrl.notice);

// router.get('/read/:num', adminCtrl.noticeRead);

module.exports = router;