"use strict";

const express = require("express");
const router = express.Router();
const mypage_ctrl = require("../controller/mypage_ctrl");

//첫 로그인 시 마이페이지에 담기는 정보들 get
router.post("/first_login_userInfo", mypage_ctrl.first_login_userInfo);
//마이페이지 수정(기본 정보는 카카오 로그인할 때 담긴다)
router.post("/profile_modify", mypage_ctrl.profile_modify);
//마이페이지
router.get("/show_me", mypage_ctrl.show_me);

module.exports = router;