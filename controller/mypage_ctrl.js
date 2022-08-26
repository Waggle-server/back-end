"use strict"

const mypageDAO = require("../model/mypageDAO");

async function first_login_userInfo(req, res, next) {
    try {
        const user_key = (req.get('user_key') != "" && req.get('user_key') != undefined) ? req.get('user_key') : null;
        const nickname = req.body.nickname;
        let sex = req.body.sex;
        const tags = req.body.tags;
        const mbti = req.body.mbti;
        const intro = req.body.intro;

        if (sex == "여자") sex = 1
        else if (sex == "남자") sex = 2

        const parameter = { user_key, nickname, sex, tags, mbti, intro };
        const db_data = await mypageDAO.first_login_getInfo(parameter);

        res.json({
            "db_data": db_data
        })
    } catch (err) {
        res.send("사용자 정보를 가져올 수 없음")
    }
}

async function profile_modify(req, res, next) {
    try {
        const user_key = (req.get('user_key') != "" && req.get('user_key') != undefined) ? req.get('user_key') : null;
        const nickname = req.body.nickname;
        let sex = req.body.sex;
        const mbti = req.body.mbti;
        const intro = req.body.intro;
        const tags = req.body.tags;

        if (sex == "여자") sex = 1
        else if (sex == "남자") sex = 2
        
        const user_parameter = { user_key, nickname };
        let db_data = await mypageDAO.user_profile_modify(user_parameter);
        const detail_parameter = { sex, mbti, tags, intro };
        db_data = await mypageDAO.user_detail_profile_modify(detail_parameter);

        res.send({ result: "success" });
    } catch(err) {
        res.send("사용자 정보 수정 오류");
    }
}

async function show_me(req, res, next) {
    try {
        const user_key = (req.get('user_key') != "" && req.get('user_key') != undefined) ? req.get('user_key') : null;
        const db_data = await mypageDAO.show_me(user_key);

        res.json({
            "db_data": db_data
        })
    } catch(err) {
        res.send("마이페이지 오류");
    }
}

module.exports = {
    first_login_userInfo,
    profile_modify,
    show_me
}