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


module.exports = {
    admin_check,
    admin_info
}