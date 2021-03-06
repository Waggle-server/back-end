"use strict";

const friendDAO = require("../model/friendDAO");
const chatDAO = require("../model/chatDAO");

//친구 요청 post
async function req_friend(req, res, next) {
    try {
        const req_person = req.body.req_person;
        const res_person = req.body.res_person;

        const parameter = { req_person, res_person };

        console.log("req_person: " + req_person + ", res_person: " + res_person);
        const db_data = await friendDAO.req_friend(parameter);

        res.send("success");
    } catch (err) {
        res.send("사용자를 찾을 수 없습니다.");
    }
}

//친구 요청 응답 post
async function res_friend(req, res, next) {
    try {
        const user_key = req.body.user_key;
        const del_friend = req.body.del_friend;
        const answer = req.body.answer;

        const parameter = { user_key, del_friend };

        if (answer == "수락") {
            const db_data_1 = await friendDAO.res_friend_accept(parameter);
            const db_data_2 = await friendDAO.res_friend_accept_add(parameter);
            res.send("success");
        }
        if (answer == "거절") {
            const db_data_3 = await friendDAO.remove_firend(parameter);
            res.send("success");
        }
    } catch (err) {
        res.send("응답 작동 오류");
    }
}

//친구 맺어진 리스트 get
async function list_friend(req, res, next) {
    try {
        const user_key = req.params.user_key
        const db_data = await friendDAO.show_friend_list(user_key);
        res.json({
            "db_data": db_data
        });
    } catch (err) {
        res.send("친구 리스트를 불러올 수 없습니다.");
    }
}

//친구 삭제
async function del_friend(req, res, next) {
    try {
        var user_key = req.body.user_key;
        var del_friend = req.body.del_friend;
        var parameter_1 = { user_key, del_friend };

        var suffer = user_key;
        user_key = del_friend;
        del_friend = suffer;

        var parameter_2 = { user_key, del_friend }

        const db_data_1 = await friendDAO.remove_firend(parameter_1);
        const db_data_2 = await friendDAO.remove_firend(parameter_2);
        res.send("success");
    } catch (err) {
        res.send("사용자 삭제 오류");
    }
}

//친구 채팅
async function chat_friend(req, res, next) {
    try {
        const user_key = req.params.user_key;
        const friend_key = req.params.friend_key;
        let load_name = await chatDAO.listC_load_name(friend_key);
        load_name = load_name[0].nickname;
        const parameter = { user_key, load_name };
        const db_data_C = await chatDAO.chat_list_friendC(parameter);
        let db_data = await chatDAO.chat_listR_socket(user_key);
        db_data = db_data[0];
        res.render('socket_test', { db_data, user_key });
    } catch (err) {
        res.send("통신 오류");
    }
}

module.exports = {
    req_friend,
    res_friend,
    list_friend,
    del_friend,
    chat_friend
}