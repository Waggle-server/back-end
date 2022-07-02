const express = require('express');
const router = express.Router();

const guestPlaceCtrl = require('../controller/guestPlaceCtrl');

const { gpUpload } = require("../middleware/multer");


router.get('/rank', guestPlaceCtrl.gpRank);
router.get('/search/:search', guestPlaceCtrl.gpSearch);

router.get('/read/:num', guestPlaceCtrl.gpRead);


router.post('/create', 
    gpUpload.single('img'),
    guestPlaceCtrl.gpCreate
);

router.post('/delete', guestPlaceCtrl.gpDelete)


module.exports = router;