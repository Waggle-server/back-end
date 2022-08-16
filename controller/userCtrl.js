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
            res.send({result: {login: true, user_key: db_data[0].user_key}})
        } else {
            res.send({result: {login: false, user_key: null}})
        }
    }
}


const signUp  = async (req, res) => {
    const accessToken = req.get('accessToken');
    let profile = await profile_load(accessToken);

    console.log(profile)
    if(profile == null){
        console.log("잘못된 토큰");
        res.send({result: "Token error"})
    } else{
        let insert_data = await userDAO.insert_profile(profile);
        profile.user_key = insert_data.insertId;

        let db_data = await userDAO.exist_id(profile);

        if(db_data.length != 0){
            res.send({result: {signip: true, user_key: db_data[0].user_key}})
        } else {
            res.send({result: {signup: false, user_key: null}})
        }
    }
}

const logOut = async (req, res) => {
    res.send({result: {logout: true}});
}


module.exports = {
    userCheck,
    signUp,
    logOut
}