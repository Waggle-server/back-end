"use strict"

const axios = require('axios').default;

const userDAO = require('../model/userDAO');

let profile_load = async (accessToken) =>{
    await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
    })
    .then(function (res) {
        const parameters = {
            id: res.data.id,
            nickname: res.data.properties.nickname,
            img: res.data.properties.profile_image
        }
        console.log(parameters);
        return parameters;
    })
    .catch(function (err) {
        console.log(err);
    })
} 


const userCheck = async (req, res) => {
    const accessToken = req.body.accessToken;

    profile = profile_load(accessToken);
    
    console.log(profile);

    db_data = await userDAO.exist_id(profile);

    if(db_data.length != 0){
        req.session.user_key = db_data[0].user_key;
        req.session.user_id = db_data[0].user_id;
        req.session.user_nickname = db_data[0].user_nickname;
        req.session.user_img = db_data[0].user_img;

        res.send({result : "exist -> log in"})
    } else {
        res.send({result : "no exist -> sign up"})
    }
}

const signUp  = async (req, res) => {
    const accessToken = req.body.accessToken;
    profile = profile_load(accessToken);

    let insert_data = await userDAO.insert_profile(profile);
    profile.user_key = insert_data.insertId;

    db_data = await userDAO.exist_id(profile);

    req.session.user_key = db_data[0].user_key;
    req.session.user_id = db_data[0].user_id;
    req.session.user_nickname = db_data[0].user_nickname;
    req.session.user_img = db_data[0].user_img;

    res.send("회원등록 성공");
}

const logOut = async (req, res) => {
    delete req.session.user_key;
    delete req.session.user_id;
    delete req.session.user_nickname;
    delete req.session.user_img;

    res.send("로그아웃");
}


module.exports = {
    userCheck,
    signUp,
    logOut
}