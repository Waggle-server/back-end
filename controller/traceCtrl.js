"use strict"

const traceDAO = require('../model/traceDAO');

const save = async (req, res) => {
    const parameters = {
        user_key: (!isNaN(req.get('user_key'))) ? req.get('user_key') : null
    }

    let lati_list = req.body.lati
    let longi_list = req.body.longi

    if(parameters.user_key != null){
        console.log(lati_list)
        for(let i=0; i<lati_list.length; i++){
            parameters.lati = lati_list[i]
            parameters.longi = longi_list[i]
            
            await traceDAO.save(parameters);
        }
        res.send({result: "save success"})
    } else {
        res.send({result: "user_key null"})
    }
}

const list = async (req, res) => {
    const parameters = {
        user_key: (!isNaN(req.get('user_key'))) ? req.get('user_key') : null
    }

    if(parameters.user_key != null){

        let db_data = await traceDAO.list(parameters);
        
        res.send({result: db_data})
    } else {
        res.send({result: "user_key null"})
    }
}   


module.exports = {
    save,
    list
}