const db = require('../config/dbconn');

const gb = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(``, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


module.exports = {

}