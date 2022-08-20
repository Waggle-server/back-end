const express = require('express');
const router = express.Router();

const traceCtrl = require('../controller/traceCtrl');


// 위도 lati 경도 longi


router.post('/save', traceCtrl.save);
router.get('/list', traceCtrl.list);



module.exports = router;