const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../config/dbconn');
const KakaoStrategy = require('passport-kakao').Strategy;

let id = '';

passport.use('kakao', new KakaoStrategy({
    clientID: 'd727f6815e9eee5d70bb9167aca6dec6',
    callbackURL: 'http://localhost:3000/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);

    console.log(accessToken);
    console.log(refreshToken);

    db.query(`SELECT * FROM user WHERE id=${profile.id}`, (err, db_data) => {
        if(err) {
            reject(err);
        } else {
            if(db_data.length === 0){
                db.query(`INSERT INTO user (id) VALUES(?);`, [profile.id], (err, result) =>{
                    if(err){
                        throw err;
                    }
                })
            }
        }
    });
  }
));

console.log(id);

router.use('/callback', passport.authenticate('kakao'));


module.exports = router;