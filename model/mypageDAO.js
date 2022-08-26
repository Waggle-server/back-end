"use strict";

const {db} = require("../config/dbconn");

function profile_modify(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO user_detail(user_key, intro, sex, mbti, tag) values (?, ?, ?, ?, ?)`;
        db.query(queryData, [parameter.user_key, parameter.intro, parameter.sex, parameter.mbti, parameter.tags], (err, db_data) => {
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

function user_info_modify(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `UPDATE user SET nickname = ? where user_key = ?`;
        db.query(queryData, [parameter.nickname, parameter.user_key], (err, db_data) => {
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

function show_me(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT nickname, img, mbti, intro, tag, deco FROM user LEFT OUTER JOIN user_detail ON user_detail.user_key = user.user_key where user.user_key = ?`;
        db.query(queryData, [parameter], (err, db_data) => {
            console.log(db_data)
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

module.exports = {
    profile_modify,
    user_info_modify,
    show_me
}
