"use strict";

const {db} = require("../config/dbconn");

function read_deco_list() {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT deco_key, content FROM decoration`;
        db.query(queryData, (err, db_data) => {
            console.log(db_data);
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

function send_deco(parameter) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT deco_key, content FROM decoration where deco_key = ?`;
        db.query(queryData, [parameter], (err, db_data) => {
            console.log(db_data)
            if(db_data) resolve(db_data);
            else reject(err);
        })
    })
}

module.exports = {
    read_deco_list,
    send_deco
}