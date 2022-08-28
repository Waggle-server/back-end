"use strict";

const aiDAO = require("../model/aiDAO");


const user_pick = async (req, res) => {
    let result = await aiDAO.user_pick();

    res.send({result: result});
}


module.exports = {
    user_pick
}