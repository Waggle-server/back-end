"use strict";

const express = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const fs = require('fs');
const path = require('path');


const noticeRouter = require("./routes/notice");
const guestPlaceRouter = require("./routes/guestPlace");
const guestBookRouter = require("./routes/guestBook");

const friendRouter = require("./routes/friendRouter");
const chatRouter = require("./routes/chatRouter");
const accompanyRouter = require("./routes/accompanyRouter");

const adminRouter = require("./routes/admin");

const kakaoRouter = require('./routes/kakao')



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname +'/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/notice', noticeRouter);
app.use('/guestPlace', guestPlaceRouter);   //방명록 장소등록
app.use('/guestBook', guestBookRouter);     //방명록

app.use("/friend", friendRouter);
app.use("/chat", chatRouter);
app.use("/accompany", accompanyRouter);




app.use('/admin', adminRouter);

// app.use('/friend', friendRouter);
// app.use('/chat', chatRouter);

app.use("/kakao", kakaoRouter);







// ERROR 잘못된 경로
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});





module.exports = app;

