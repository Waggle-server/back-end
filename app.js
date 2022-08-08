"use strict";

const express = require('express');
const app = express();

const session = require('express-session');
const {sessionStore} = require('./config/dbconn');

const fs = require('fs');
const path = require('path');


const userRouter = require('./routes/user')

const noticeRouter = require("./routes/notice");
const guestPlaceRouter = require("./routes/guestPlace");
const guestBookRouter = require("./routes/guestBook");
const traceRouter = require("./routes/trace");


const friendRouter = require("./routes/friendRouter");
const chatRouter = require("./routes/chatRouter");
const accompanyRouter = require("./routes/accompanyRouter");
const pairRouter = require("./routes/pairRouter");
const alarmRouter = require("./routes/alarmRouter");


const adminRouter = require("./routes/admin");





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname +'/public'));

app.use(session({
    secret: process.env.SECRET_KEY, // 암호화
    resave: false,                  // 세션을 언제나 저장
    saveUninitialized: true,        // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    store: sessionStore,
    cookie: {
        maxAgeL: 1000 * 60 * 60
    }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRouter);


app.use('/notice', noticeRouter);
app.use('/guestPlace', guestPlaceRouter);   //방명록 장소등록
app.use('/guestBook', guestBookRouter);     //방명록
app.use("/trace", traceRouter);



app.use("/friend", friendRouter);
app.use("/chat", chatRouter);
app.use("/accompany", accompanyRouter);
app.use("/pair", pairRouter);
app.use("/alarm", alarmRouter);




app.use('/admin', adminRouter);

// app.use('/friend', friendRouter);
// app.use('/chat', chatRouter);







// ERROR 잘못된 경로
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});





module.exports = app;

