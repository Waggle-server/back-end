"use strict";

const mysql = require('mysql');
require('dotenv').config({ path: '.env'});

const dbOption = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true    // 다중쿼리문
}

const db = mysql.createConnection(dbOption);

db.connect();

module.exports = db;    