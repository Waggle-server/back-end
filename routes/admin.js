const express = require('express');
const router = express.Router();

const adminCtrl = require('../controller/adminCtrl');


// ?=search & page
router.get('/login', adminCtrl.login);

// router.get('/notice', adminCtrl.notice);

// router.get('/read/:num', adminCtrl.noticeRead);

module.exports = router;