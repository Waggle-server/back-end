const db = require('../config/dbconn');


// 승인 안된 것들이 위로, 오래된 순
const gpAccept_admin = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT nickname, place, date, accept FROM guestBook_place LEFT JOIN user ON user.user_key = guestBook_place.user_key ORDER BY accept, date;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpAccept_user = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT nickname, place, date, accept FROM guestBook_place LEFT JOIN user ON user.user_key = guestBook_place.user_key WHERE accept=false ORDER BY date;`, [parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

// 승인
const gpAccept = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestBook_plcae SET accept=true WHERE place_key=?;`,[parameters.place_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}




const gpRank = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT place_key, place FROM guestBook_place WHERE accept=true ORDER BY heart DESC limit 5;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpSearch = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT place_key, place, img FROM guestBook_place WHERE (accept=true AND place LIKE '%${parameters.search}%') ORDER BY heart DESC LIMIT 5;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpRead = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM guestBook_place WHERE place_key=?;`, [parameters.place_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



const gpCreate = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO guestBook_place (user_key, place, address, des, img) VALUES(?, ?, ?, ?, ?);`, [parameters.user_key, parameters.place, parameters.address, parameters.des, parameters.img], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpDelete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM guestBook_place WHERE place_key=?;`, [parameters.place_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



module.exports = {
    gpRank,
    gpSearch,
    gpRead,
    gpCreate,
    gpDelete
}