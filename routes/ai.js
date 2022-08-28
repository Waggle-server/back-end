const express = require('express');
const router = express.Router();

const aiCtrl = require('../controller/aiCtrl');


// 임의 랜덤 값 추출
router.get('/userPick', aiCtrl.user_pick);



module.exports = router;
