const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/userCtrl');


router.post('/userCheck', userCtrl.userCheck);

router.post('/signUp', userCtrl.signUp);



module.exports = router;