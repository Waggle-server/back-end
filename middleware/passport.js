"use strict";

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy

require('dotenv').config();

const userDAO = require('../model/userDAO');


const kakao = passport.use('kakao', new KakaoStrategy({
  //REST API KEY
  clientID: process.env.REST_API_KEY,
  // REDIRECT URI
  callbackURL: process.env.REDIRECT_URI,
    
  }, async (accessToken, refreshToken, profile, done) => {
    const parameters = {
        id : profile.id,
        nickname: profile._json.properties.nickname,
        img: profile._json.properties.profile_image
    }

    const db_data = await userDAO.exist_id(parameters);

    if(db_data.length === 0){
      await userDAO.insert_profile(parameters);
    }
    console.log(accessToken);
    console.log(refreshToken);
  }
  
));

module.exports = {
  kakao
}
