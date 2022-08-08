const {db} = require('../config/dbconn');


const search = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO log (user_key, log, type) VALUES(?, ?, 'search');`, [parameters.user_key, parameters.log], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const read = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO log (user_key, log, type) VALUES(?, ?, 'read');`, [parameters.user_key, parameters.log], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO log (user_key, log, type) VALUES(?, ?, 'create');`, [parameters.user_key, parameters.log], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const heart = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO log (user_key, log, type) VALUES(?, ?, 'heart');`, [parameters.user_key, parameters.log], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}




module.exports = {
    search,
    read,
    create,
    heart
}