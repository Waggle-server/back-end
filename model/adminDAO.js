const {db} = require('../config/dbconn');

const admin_check = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM admin WHERE (id=? AND pw=?)`, [parameters.id, parameters.pw], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const admin_info = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT admin_key, name FROM admin WHERE admin_key=?`, [parameters.admin_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


const gp_list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT gp_key, user_key, (SELECT nickname from user  WHERE guestPlace.user_key=user.user_key) as nickname, place, DATE_FORMAT(date, '%Y-%m-%d %T') as date, accept
        FROM guestPlace ORDER BY accept ASC, date DESC LIMIT ?, ?;`, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gp_list_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM guestPlace;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


module.exports = {
    admin_check,
    admin_info,
    
    gp_list,
    gp_list_cnt
}