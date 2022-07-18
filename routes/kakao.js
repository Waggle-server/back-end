"use strict";

const express = require('express');
const router = express.Router();

// const passport = require('passport');
// const passport_kakao = require('../middleware/passport').kakao;

const kakao = require('../middleware/kakao')


router.get('/userProfile',  kakao.userProfile);


module.exports = router;