"use strict";

const express = require("express");
const router = express.Router();
const mypage_ctrl = require("../controller/mypage_ctrl");

//마이페이지 수정(기본 정보는 카카오 로그인할 때 담긴다)
router.post("/profile_modify/:user_key", mypage_ctrl.profile_modify);
//마이페이지
router.get("/show_me/:user_key", mypage_ctrl.show_me);

module.exports = router;