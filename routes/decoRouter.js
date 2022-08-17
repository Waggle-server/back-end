"use strict";

const express = require("express");
const router = express.Router();
const deco_ctrl = require("../controller/deco_ctrl");

//개인 훈장 리스트 보여주기
router.get('/show_deco_list', deco_ctrl.show_deco_list);

module.exports = router;