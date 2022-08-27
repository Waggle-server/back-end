"use strict";

const {db} = require("../config/dbconn");

function first_login_getInfo(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO user_detail(user_key, intro, sex, mbti, tag) values (?, ?, ?, ?, ?)`;
        db.query(queryData, [parameter.user_key, parameter.intro, parameter.sex, parameter.mbti, parameter.tags], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

function user_profile_modify(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `UPDATE user SET nickname = ? where user_key = ?`;
        db.query(queryData, [parameter.nickname, parameter.user_key], (err, db_data) => {
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

function user_detail_profile_modify(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `UPDATE user_detail SET sex = ?, mbti = ?, tag = ?, intro = ? where user_key = ?`;
        db.query(queryData, [parameter.sex, parameter.mbti, parameter.tags, parameter.intro, parameter.user_key], (err, db_data) => {
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
    first_login_getInfo,
    user_profile_modify,
    user_detail_profile_modify,
    show_me
}
