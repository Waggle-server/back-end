const express = require('express');
const router = express.Router();

const reportCtrl = require('../controller/reportCtrl');


router.get('/guestPlace', reportCtrl.guestPlace);
router.get('/guestBook', reportCtrl.guestBook);
router.get('/accompany', reportCtrl.accompany);




module.exports = router;
