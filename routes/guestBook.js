const express = require('express');
const router = express.Router();

const guestBookCtrl = require('../controller/guestBookCtrl');

const multer  = require("../middleware/multer");


// router.get('/', guestBookCtrl.gbSearch);





// ?=search & page
router.get('/search', guestBookCtrl.gbSearch);

//num: gp_key
router.get('/read/list/:num', guestBookCtrl.gbList);

//num: user_Key
router.get('/read/myList/:num', guestBookCtrl.gbMyList);   

//num: gb_key
router.get('/read/:num', guestBookCtrl.gbRead);            


router.post('/create', 
    multer.upload('guestBook').single('img'),
    guestBookCtrl.gbCreate
);

router.post('/update', guestBookCtrl.gbUpdate);

router.post('/update/heart', guestBookCtrl.gbHeart);

router.post('/delete', guestBookCtrl.gbDelete);



module.exports = router;