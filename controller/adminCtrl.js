"use strict"

const noticeDAO = require('../model/noticeDAO');

const { paging } = require('./tool/paging');

const login = async (req, res) => {
    const parameters = {
        notice_key: req.params.num
    }



    res.render(`../views/admin/login.ejs`);

}


// const notice = async (req, res) => {
//     let currentPage = req.query.page;
//         const pageSize = 10;
//         const page = paging(currentPage, pageSize);
    
//         const parameters = {
//             search: (req.query.search == undefined) ? "" : req.query.search,
//             type1: 0,
//             type2: 1,
//             offset: page.offset,
//             limit: page.limit
//         }
    
//         console.log(parameters);
        
//         try {
//             const db_data = await noticeDAO.noticeSearch(parameters);
//             res.render('../views/admin/notice/notice', {result : db_data});
//         } catch (err) {
//             console.log(err);
//         }
// }

// const noticeRead = async (req, res) => {
//     const parameters = {
//         notice_key: req.params.num
//     }

//     try {
//         const db_data = await noticeDAO.noticeRead(parameters);
//         res.render(`../views/admin/notice/read`, {result : db_data});
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports = {
    login
}