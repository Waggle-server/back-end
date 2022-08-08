const {db} = require('../config/dbconn');


// 승인 안된 것들이 위로, 오래된 순
const gpAccept_admin = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT nickname, place, date, accept FROM guestPlace
            LEFT JOIN user ON user.user_key=guestPlace.user_key
            ORDER BY accept, date;`, (err, db_data) => {
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
        db.query(
            `SELECT nickname, place, date, accept FROM guestPlace
            LEFT JOIN user ON user.user_key = guestPlace.user_key
            WHERE accept=false
            ORDER BY date;`, [parameters.user_key], (err, db_data) => {
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
        db.query(`UPDATE guestBook_plcae SET accept=true WHERE gp_key=?;`,[parameters.gp_key], (err, db_data) => {
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
        db.query(
            `SELECT guestPlace.gp_key, place, SUM(heart) AS heart FROM guestPlace
            LEFT JOIN guestPlace_heart ON guestPlace.gp_key=guestPlace_heart.gp_key
            WHERE accept=true  
            GROUP BY guestPlace.gp_key ORDER BY heart DESC LIMIT 5;`, (err, db_data) => {
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
        db.query(
            `SELECT guestPlace.gp_key, place, img, SUM(heart) AS heart FROM
            guestPlace LEFT JOIN guestPlace_heart ON guestPlace.gp_key=guestPlace_heart.gp_key
            WHERE (accept=true AND place LIKE ?)
            GROUP BY guestPlace.gp_key
            ORDER BY heart DESC
            LIMIT 5;`, [`%${parameters.search}%`], (err, db_data) => {
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
        db.query(
            `SELECT gp_key, place, address, des, guestPlace.img,
            user.user_key, nickname, user.img AS user_img,
            (SELECT COUNT(*) FROM guestBook WHERE gp_key = guestPlace.gp_key) AS gb_count,
	        (SELECT GROUP_CONCAT(user_key) FROM guestPlace_heart WHERE gp_key = guestPlace.gp_key AND heart=true) AS heart_user,
            (SELECT SUM(heart) FROM guestPlace_heart WHERE gp_key = guestPlace.gp_key) AS heart
	        FROM guestPlace
            LEFT JOIN user ON guestPlace.user_key=user.user_key
            WHERE gp_key=?;`, [parameters.gp_key], (err, db_data) => {
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
        db.query(`INSERT INTO guestPlace (user_key, place, address, des, img) VALUES(?, ?, ?, ?, ?);`, [parameters.user_key, parameters.place, parameters.address, parameters.des, parameters.img], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                db.query(`INSERT INTO guestPlace_heart (gp_key, user_key) VALUES(?, ?);`, [db_data.insertId, parameters.user_key], (err2, db_data2) =>{
                    if(err){
                        reject(err2);
                    } else{
                        resolve(db_data);   // guestPlace key 값 전달
                    }
                });
            }
        })
    })
}

const gpDelete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM guestPlace_heart WHERE gp_key=?; DELETE FROM guestPlace WHERE gp_key=?;`, [parameters.gp_key, parameters.gp_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



// heart
const gpHeart_check = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM guestPlace_heart WHERE gp_key=? AND user_key=?;`, [parameters.gp_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpHeart_insert = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO guestPlace_heart (gp_key, user_key, heart) VALUES(?, ?, true);`, [parameters.gp_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpHeart_update = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestPlace_heart SET heart= !heart WHERE gp_key=? AND user_key=?;`, [parameters.gp_key, parameters.user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gpHeart_log = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT place, guestPlace_heart.user_key AS user_key, heart FROM guestPlace
        LEFT JOIN guestPlace_heart ON guestPlace.gp_key = guestPlace_heart.gp_key 
        WHERE guestPlace_heart.user_key=? AND guestPlace_heart.gp_key=?;`, [parameters.user_key, parameters.gp_key], (err, db_data) => {
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
    gpDelete,

    gpHeart_check,
    gpHeart_insert,
    gpHeart_update,
    gpHeart_log
}