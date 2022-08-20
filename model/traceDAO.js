const {db} = require('../config/dbconn');


const save = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO trace (user_key, lati, longi) VALUES(?, ?, ?);`, [parameters.user_key, parameters.lati, parameters.longi], (err, db_data) =>{
            if(err){
                reject(err);
            } else{
                resolve(db_data);
            }
            
        })
    })
}

const list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT trace_key, lati, longi FROM trace WHERE user_key=? ORDER BY trace_key ASC`, [parameters.user_key], (err, db_data) =>{
            if(err){
                reject(err);
            } else{
                resolve(db_data);
            }
            
        })
    })
}



module.exports = {
    save,
    list
}