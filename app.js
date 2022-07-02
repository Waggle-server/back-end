"use strict";

const express = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const fs = require('fs');
const path = require('path');

const main = require("./routes/user_account");

const noticeRouter = require("./routes/notice");
const guestPlaceRouter = require("./routes/guestPlace");
const guestBookRouter = require("./routes/guestBook");



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'blackzat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.use("/", main);

app.use('/notice', noticeRouter);
app.use('/guestPlace', guestPlaceRouter);   //방명록 장소등록
app.use('/guestBook', guestBookRouter);     //방명록

// app.use('/friend', friendRouter);
// app.use('/chat', chatRouter);

app.use("/kakao", require('./routes/kakao'));



// multer
app.use(function (req, res, next) {
    let dir = './public/images';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});






// ERROR 잘못된 경로
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
  
app.use(function (err, req, res, next) {
console.error(err.stack)
res.status(500).send('Something broke!')
});





module.exports = app;

