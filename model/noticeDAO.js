const db = require('../config/dbconn');

/*
const noticeList = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT notice_key, nickname, title, content, date FROM notice LEFT JOIN user ON notice.user_key=user.user_key  WHERE type=0 OR type=1;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
*/

const noticeSearch = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT notice_key, nickname, title, content, date FROM notice LEFT JOIN user ON notice.user_key=user.user_key WHERE (type='${parameters.type1}' OR type='${parameters.type2}') AND (title like '%${parameters.search}%' OR content like '%${parameters.search}%');`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const noticeRead = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT notice.*, nickname FROM notice LEFT JOIN user ON notice.user_key=user.user_key WHERE notice_key=?;`, [parameters.notice_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

// const lastAutoInt = (parameters) =>{
//     return new Promise((resolve, reject) =>{
//         db.query(`SELECT LAST_INSERT_ID();`, (err, db_data) => {
//             if(err) {
//                 reject(err);
//             } else {
//                 resolve(db_data);
//             }
//         })
//     })
// }


const noticeWrite = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO notice (user_key, title, img, content, type) values(?, ?, ?, ?, ?);`, [parameters.user_key, parameters.title, parameters.img, parameters.content, parameters.type], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const noticeUpdate = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE notice SET user_key=?, title=?, content=?, type=? where notice_key=?;`, [parameters.user_key, parameters.title, parameters.content, parameters.type, parameters.notice_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const noticeDelete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM notice WHERE notice_key=?;`, [parameters.notice_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}







module.exports = {
    // noticeList,
    noticeSearch,
    noticeRead,
    noticeWrite,
    noticeUpdate,
    noticeDelete

    //lastAutoInt
}