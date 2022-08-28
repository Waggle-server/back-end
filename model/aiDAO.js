const {db} = require('../config/dbconn');


const user_rand = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT user.user_key, nickname, img, temperature, intro FROM user LEFT JOIN user_detail ON user.user_key = user_detail.user_key ORDER BY rand() limit 5`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    user_rand
}