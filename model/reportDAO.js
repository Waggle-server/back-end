const {db} = require('../config/dbconn');


const guestPlace= (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestPlace SET accept=false WHERE gp_key=?;
                INSERT INTO report(user_key, Xuser_key, type, Xkey, des) VALUES(?, ?, 1, ?, ?)`, [parameters.gp_key, parameters.user_key, parameters.Xuser_key, parameters.gp_key, parameters.des], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const guestBook= (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestBook SET accept=false WHERE gb_key=?;
                INSERT INTO report(user_key, Xuser_key, type, Xkey, des) VALUES(?, ?, 2, ?, ?)`, [parameters.gb_key, parameters.user_key, parameters.Xuser_key, parameters.gb_key, parameters.des], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


const accompany= (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE accompany SET accept=false WHERE post_key=?;
                INSERT INTO report(user_key, Xuser_key, type, Xkey, des) VALUES(?, ?, 3, ?, ?)`, [parameters.post_key, parameters.user_key, parameters.Xuser_key, parameters.post_key, parameters.des], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



module.exports = {
    guestPlace,
    guestBook,
    accompany
}