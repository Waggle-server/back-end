const express = require('express');
const router = express.Router();

const guestBookCtrl = require('../controller/guestBookCtrl');

const multer  = require("../middleware/multer");


// router.get('/', guestBookCtrl.gbSearch);





// ?=search & page
router.get('/search', guestBookCtrl.gbSearch);

router.get('/read/list/:num', guestBookCtrl.gbList);       //num: gp_key
router.get('/read/myList/:num', guestBookCtrl.gbMyList);   //num: user_Key

router.get('/read/:num', guestBookCtrl.gbRead);            //num: gb_key


router.post('/create', 
    multer.upload('guestBook').single('img'),
    guestBookCtrl.gbCreate
);


router.post('/update', guestBookCtrl.gbUpdate);
router.post('/update/heart', guestBookCtrl.gbHeart);





router.post('/delete', guestBookCtrl.gbDelete);

module.exports = router;