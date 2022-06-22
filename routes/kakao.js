const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
    clientID: 'd727f6815e9eee5d70bb9167aca6dec6',
    callbackURL: 'http://localhost:3000/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
}))



router.get('/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('/');
});

module.exports = router;