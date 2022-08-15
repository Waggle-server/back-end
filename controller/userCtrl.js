"use strict"

const axios = require('axios').default;

const userDAO = require('../model/userDAO');

let profile_load = async (accessToken) =>{
    let parameters;
    await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
    })
    .then(function (res) {
        parameters = {
            id: res.data.id,
            nickname: res.data.properties.nickname,
            img: res.data.properties.profile_image
        }
        console.log(parameters);
    })
    .catch(function (err) {
        // console.log(err);
    })

    return parameters;
} 


const userCheck = async (req, res) => {
    const accessToken = req.get('accessToken');

    console.log(req.get('accessToken'));

    let profile = await profile_load(accessToken);
    
    console.log(profile);

    if(profile == null){
        console.log("잘못된 토큰");
        res.send({result: "Token error"})
    } else{
        let db_data = await userDAO.exist_id(profile);

        if(db_data.length != 0){
            req.session.user_key = db_data[0].user_key;
            req.session.user_id = db_data[0].user_id;
            req.session.user_nickname = db_data[0].user_nickname;
            req.session.user_img = db_data[0].user_img;

            res.send({result: true})
        } else {
            res.send({result: false})
        }
    }
}


const signUp  = async (req, res) => {
    const accessToken = req.get('accessToken');
    let profile = await profile_load(accessToken);

    console.log(profile)
    if(profile == null){
        console.log("잘못된 토큰");
    } else{
        let insert_data = await userDAO.insert_profile(profile);
        profile.user_key = insert_data.insertId;

        let db_data = await userDAO.exist_id(profile);

        req.session.user_key = db_data[0].user_key;
        req.session.user_id = db_data[0].user_id;
        req.session.user_nickname = db_data[0].user_nickname;
        req.session.user_img = db_data[0].user_img;

        res.send({result: true});
    }
}

const logOut = async (req, res) => {
    delete req.session.user_key;
    delete req.session.user_id;
    delete req.session.user_nickname;
    delete req.session.user_img;

    res.send({result: true});
}


module.exports = {
    userCheck,
    signUp,
    logOut
}