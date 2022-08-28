"use strict";

const aiDAO = require("../model/aiDAO");


const user_pick = async (req, res) => {
    console.log("dddd")
    let result = await aiDAO.user_rand();
    console.log(result)
    res.send({result: result});
}


module.exports = {
    user_pick
}