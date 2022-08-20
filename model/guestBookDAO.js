const {db} = require('../config/dbconn');


const gbSearch = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT guestBook.gb_key, guestBook.gp_key, place, comment, guestBook.img,
            (SELECT nickname FROM user WHERE user.user_key = guestBook.user_key) AS nickname,
            (SELECT SUM(heart) FROM guestBook_heart WHERE gb_key = guestBook.gb_key) AS heart
            FROM guestBook
            LEFT JOIN guestPlace ON guestPlace.gp_key=guestBook.gp_key
            WHERE (comment LIKE ?) AND (guestBook.img IS NOT NULL)
            ORDER BY date_update DESC LIMIT ?, ?;`,[`%${parameters.search}%`, parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbRead = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT gb_key, guestBook.img, comment, guestBook.gp_key,
            place, address,
            user.user_key, user.img as user_img, nickname,
            (SELECT GROUP_CONCAT(user_key) FROM guestBook_heart WHERE gb_key = guestBook.gb_key AND heart=true) AS heart_user,
            (SELECT SUM(heart) FROM guestBook_heart WHERE gb_key = guestBook.gb_key) AS heart 
            FROM guestBook
            LEFT JOIN user ON user.user_key=guestBook.user_key
            LEFT JOIN guestPlace ON guestBook.gp_key=guestPlace.gp_key
            WHERE guestBook.gb_key=?;`,[parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbList = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT gb_key, guestBook.img, comment,
            user.user_key, user.img as user_img, nickname,
            (SELECT GROUP_CONCAT(user_key) FROM guestBook_heart WHERE gb_key = guestBook.gb_key AND heart=true) AS heart_user,
            (SELECT SUM(heart) FROM guestBook_heart WHERE gb_key = guestBook.gb_key) AS heart 
            FROM guestBook
            LEFT JOIN user ON user.user_key=guestBook.user_key
            WHERE guestBook.gp_key=?
            ORDER BY date_update DESC LIMIT ?, ?;`,[parameters.gp_key, parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbMyList = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT gb_key, guestBook.gp_key, guestBook.img, place 
            FROM guestBook
            LEFT JOIN guestPlace ON guestBook.gp_key=guestPlace.gp_key
            WHERE guestBook.user_key=?
            ORDER BY date_update DESC LIMIT ?, ?;`,[parameters.user_key, parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


const gbCreate = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO guestBook (gp_key, user_key, comment,  img) VALUES(?, ?, ?, ?);`, [parameters.gp_key, parameters.user_key, parameters.comment, parameters.img], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                db.query(`INSERT INTO guestBook_heart (gb_key, user_key) VALUES(?, ?);`, [db_data.insertId, parameters.user_key], (err2, db_data2) =>{
                    if(err){
                        reject(err2);
                    } else{
                        resolve(db_data);   // guestPlace key 값 전달
                    }
                });
                resolve(db_data);
            }
        })
    })
}

const gbUpdate = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestBook SET comment=? where gb_key=?;`, [parameters.comment, parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbDelete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM guestBook_heart WHERE gb_key=?; DELETE FROM guestBook WHERE gb_key=?;`, [parameters.gb_key, parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



// heart
const gbHeart_check = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM guestBook_heart WHERE gb_key=? AND user_key=?;`, [parameters.gb_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbHeart_insert = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO guestBook_heart (gb_key, user_key, heart) VALUES(?, ?, true);`, [parameters.gb_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbHeart_update = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestBook_heart SET heart= !heart WHERE gb_key=? AND user_key=?;`, [parameters.gb_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gbHeart_log = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT (SELECT place FROM guestPlace WHERE guestPlace.gp_key = guestBook.gp_key) AS place, comment, guestBook_heart.user_key AS user_key, heart FROM guestBook
        LEFT JOIN guestBook_heart ON guestBook.gb_key = guestBook_heart.gb_key 
        WHERE guestBook_heart.user_key=? AND guestBook_heart.gb_key=?;`, [parameters.user_key, parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


module.exports = {
    gbSearch,
    gbRead,
    gbList,
    gbMyList,

    gbCreate,
    gbUpdate,
    gbDelete,

    gbHeart_check,
    gbHeart_insert,
    gbHeart_update,
    gbHeart_log
}