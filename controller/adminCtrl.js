"use strict"

const adminDAO = require('../model/adminDAO');

const { paging } = require('./tool/paging');


// 로그인
const login = async (req, res) => {
    if(req.session.admin_key){
        res.send("<script>location.href='/';</script>");
    } else{
        res.render(`../views/admin/login.ejs`);
    }
}

const login_process = async (req, res) => {
    const parameters = {
        id: req.body.id,
        pw: req.body.pw
    }
    const db_data = await adminDAO.admin_check(parameters);
    req.session.admin_key = db_data[0].admin_key;
    if(db_data.length != 0){
        
        console.log(db_data[0].admin_key)
        req.session.save(function(){
            res.send("<script>alert('로그인 성공'); location.href='/admin';</script>");
        })
    } else{
        delete req.session.admin_key;
        res.send("<script>alert(`로그인 실패 \n\n로그인페이지로 이동`); location.href='/admin/login';</script>");
    }
}

const logout_process = async (req, res) => {
    delete req.session.admin_key;
    res.send("<script>alert(`로그아웃 성공`); location.href='/admin/login';</script>");
}




const main = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/main.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}



// 관리

// 유저
const manage_user = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage_user.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
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
    login,
    login_process,
    logout_process,


    main,


    manage_user
}