const {db} = require('../config/dbconn');


const user_pick = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM user ORDER BY rand() limit 5`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    user_pick
}