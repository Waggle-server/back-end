"use strict";

const mysql = require('mysql');
require('dotenv').config({ path: 'wagle.env'});

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const dbOption = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true    // 다중쿼리문
}

const db = mysql.createConnection(dbOption);

const sessionStore = new MySQLStore(dbOption);

db.connect();

let db_keep = function(){
    db.query('SELECT 1', function(err){
        if(err) {
            console.log(err)
        }
    })
}
setInterval(db_keep, 10*10000)

module.exports = {
    db,
    sessionStore
}