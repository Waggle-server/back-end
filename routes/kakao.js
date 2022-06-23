const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../config/dbconn');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
    //REST_API KEY
    clientID: 'd727f6815e9eee5d70bb9167aca6dec6',
    // Redirect URI
    callbackURL: 'http://localhost:3000/kakao/callback',
    
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // console.log(profile.id);
    // console.log(profile._json.properties.nickname);
    // console.log(profile._json.properties.profile_image);
    console.log(profile.id);
    let user_profile = {
        id : profile.id,
        nickname: profile._json.properties.nickname,
        img: profile._json.properties.profile_image
    }

    console.log(accessToken);
    console.log(refreshToken);

    db.query(`SELECT * FROM user WHERE id=${profile.id}`, (err, db_data) => {
        if(err) {
            reject(err);
        } else {
            if(db_data.length === 0){
                db.query(`INSERT INTO user (id, nickname, img) VALUES(?, ?, ?);`, [user_profile.id, user_profile.nickname, user_profile.img], (err, result) =>{
                    if(err){
                        throw err;
                    }
                    
                })
            }
        }
    });
  }

  
));

router.use('/callback', passport.authenticate('kakao'));


module.exports = router;