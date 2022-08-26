"use strict"

const mypageDAO = require("../model/mypageDAO");

async function profile_modify(req, res, next) {
    try {
        const user_key = req.params.user_key;
        const nickname = req.body.nickname;
        const sex = req.body.sex;
        const mbti = req.body.mbti;
        const repre_deco = req.body.repre_deco;
        const intro = req.body.intro;
        const tags = req.body.tags;
        
        const parameter = { user_key, nickname, sex, mbti, repre_deco, intro, tags };
        let db_data = await mypageDAO.profile_modify(parameter);
        db_data = await mypageDAO.user_info_modify(parameter);

        res.send({result : "success"});
    } catch(err) {
        res.send("사용자 정보 수정 오류");
    }
}

async function show_me(req, res, next) {
    try {
        const user_key = req.params.user_key;
        const db_data = await mypageDAO.show_me(user_key);

        res.json({
            "db_data": db_data
        })
    } catch(err) {
        res.send("마이페이지 오류");
    }
}

module.exports = {
    profile_modify,
    show_me
}
