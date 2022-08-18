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


const gp_list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT gp_key, user_key, (SELECT nickname from user  WHERE guestPlace.user_key=user.user_key) as nickname, place, DATE_FORMAT(date, '%Y-%m-%d %T') as date, accept
        FROM guestPlace ORDER BY accept ASC, date DESC LIMIT ?, ?;`, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gp_list_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM guestPlace;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gp_read = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, (SELECT nickname from user  WHERE guestPlace.user_key=user.user_key) as nickname, DATE_FORMAT(date, '%Y-%m-%d %T') as date FROM guestPlace WHERE gp_key=?;`, [parameters.gp_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gp_gb_check = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * FROM guestBook WHERE gp_key=?;`, [parameters.gp_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gp_delete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM guestPlace_heart WHERE gp_key=?;
        DELETE FROM guestPlace WHERE gp_key=?;
        `, [parameters.gp_key, parameters.gp_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const gp_accept = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE guestPlace SET accept=!accept WHERE gp_key=?;
        `, [parameters.gp_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



const gb_list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT * ,(SELECT nickname from user WHERE guestBook.user_key=user.user_key) as nickname, (SELECT place from guestPlace WHERE guestPlace.gp_key=guestBook.gp_key) as place, DATE_FORMAT(date, '%Y-%m-%d %T') as date
        FROM guestBook ORDER BY date DESC LIMIT ?, ?;`, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gb_list_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM guestBook;`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gb_read = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, (SELECT nickname from user WHERE guestBook.user_key=user.user_key) as nickname, (SELECT place from guestPlace WHERE guestPlace.gp_key=guestBook.gp_key) as place, DATE_FORMAT(date, '%Y-%m-%d %T') as date FROM guestBook WHERE gb_key=?;`, [parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const gb_delete = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM guestBook_heart WHERE gb_key=?;
        DELETE FROM guestBook WHERE gb_key=?;
        `, [parameters.gb_key, parameters.gb_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



const qna_list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT qna_key, title, user_key, (SELECT nickname from user WHERE qna.user_key=user.user_key) as nickname, DATE_FORMAT(date_update, '%Y-%m-%d %T') as date, answer
        FROM qna ORDER BY answer ASC, date DESC LIMIT ?, ?;`, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const qna_list_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM qna`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const qna_read = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, (SELECT nickname from user WHERE qna.user_key=user.user_key) as nickname, DATE_FORMAT(date, '%Y-%m-%d %T') as date, DATE_FORMAT(date_update, '%Y-%m-%d %T') as date_update FROM qna WHERE qna_key=?`, [parameters.qna_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const qna_answer_update = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE qna SET answer=? WHERE qna_key=?`, [parameters.answer, parameters.qna_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const notice_list = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT notice_key, title, admin_key, (SELECT name from admin WHERE notice.admin_key=admin.admin_key) as name, DATE_FORMAT(date_update, '%Y-%m-%d %T') as date
        FROM notice ORDER BY date DESC LIMIT ?, ?;`, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const notice_list_cnt = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT COUNT(*) as cnt FROM notice`, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const notice_create = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO notice (admin_key, title, img, content) values(?, ?, ?, ?);`, [parameters.admin_key, parameters.title, parameters.img, parameters.content], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const notice_read = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT *, (SELECT name from admin WHERE notice.admin_key=admin.admin_key) as name, DATE_FORMAT(date, '%Y-%m-%d %T') as date, DATE_FORMAT(date_update, '%Y-%m-%d %T') as date_update FROM notice WHERE notice_key=?`, [parameters.notice_key], (err, db_data) => {
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
    admin_info,
    
    gp_list,
    gp_list_cnt,
    gp_read,
    gp_gb_check,
    gp_delete,
    gp_accept,


    gb_list,
    gb_list_cnt,
    gb_read,
    gb_delete,



    qna_list,
    qna_list_cnt,
    qna_read,
    qna_answer_update,

    notice_list,
    notice_list_cnt,
    notice_create,
    notice_read
}