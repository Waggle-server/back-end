const express = require('express');
const router = express.Router();

const guestBookCtrl = require('../controller/guestBookCtrl');

const { gbUpload } = require("../middleware/multer");


// router.get('/rank', guestPlaceCtrl.gpRank);




module.exports = router;