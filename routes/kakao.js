"use strict";

const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_kakao = require('../middleware/passport').kakao;


router.use('/callback',  passport.authenticate('kakao'));


module.exports = router;