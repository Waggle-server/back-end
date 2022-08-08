const {db} = require('../config/dbconn');


const exist_id = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM user WHERE id=?`, [parameters.id], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insert_profile = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO user (id, nickname, img) VALUES(?, ?, ?);`, [parameters.id, parameters.nickname, parameters.img], (err, db_data) =>{
            if(err){
                reject(err);
            } else{
                resolve(db_data);
            }
            
        })
    })
}




module.exports = {
    exist_id,
    insert_profile
}