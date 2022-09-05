"use strict";

const reportDAO = require("../model/reportDAO");


const guestPlace = async (req, res) => {
    const parameters = {
        user_key: req.query.user_key,
        gp_key: req.query.gp_key,
        Xuser_key: req.query.Xuser_key,
        des: req.query.des
    }

    await reportDAO.guestPlace(parameters)

    res.send({result: "success"})
}


const guestBook = async (req, res) => {
    const parameters = {
        user_key: req.query.user_key,
        gb_key: req.query.gb_key,
        Xuser_key: req.query.Xuser_key,
        des: req.query.des
    }

    await reportDAO.guestBook(parameters)

    res.send({result: "success"})
}


const accompany = async (req, res) => {
    const parameters = {
        user_key: req.query.user_key,
        post_key: req.query.post_key,
        Xuser_key: req.query.Xuser_key,
        des: req.query.des
    }

    await reportDAO.accompany(parameters)

    res.send({result: "success"})
}


module.exports = {
    guestPlace,
    guestBook,
    accompany
}