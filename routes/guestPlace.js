const express = require('express');
const router = express.Router();

const guestPlaceCtrl = require('../controller/guestPlaceCtrl');

const multer  = require("../middleware/multer");




router.get('/rank', guestPlaceCtrl.gpRank);

router.get('/search', guestPlaceCtrl.gpSearch);

router.get('/read/:num', guestPlaceCtrl.gpRead);


router.post('/create',
    multer.upload('guestPlace').single('img'),
    guestPlaceCtrl.gpCreate
);

router.post('/update/heart', guestPlaceCtrl.gpHeart);

router.post('/delete', guestPlaceCtrl.gpDelete)


module.exports = router;