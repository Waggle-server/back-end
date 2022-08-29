"use strict"

const adminDAO = require('../model/adminDAO');

const fs = require('fs');
const {imgRename} = require('../middleware/multer');
const { paging } = require('./tool/paging');



const privacy = async (req, res) => {
    res.render(`../views/admin/privacy.ejs`);
}




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
        res.render('../views/admin/manage/user.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_user_list = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        offset: page.offset,
        limit: page.limit,
    }

    const pageCnt = await adminDAO.user_list_cnt();
    const cnt = parseInt(pageCnt[0].cnt / pageSize);
    console.log(pageCnt, cnt);

    const db_data =  await adminDAO.user_list(parameters);

    res.send({result:db_data, cnt});
}


// 방명록
const manage_guest = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/guest.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

// 방명록 - 장소등록 guestPlace
const manage_gp = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/guest/place.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_gp_list = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        offset: page.offset,
        limit: page.limit,
    }

    const pageCnt = await adminDAO.gp_list_cnt();
    const cnt = parseInt(pageCnt[0].cnt / pageSize);
    console.log(pageCnt, cnt);

    const db_data =  await adminDAO.gp_list(parameters);

    res.send({result:db_data, cnt});
}

const manage_gp_read = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        gp_key: req.params.gp_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    const db_data = await adminDAO.gp_read(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/guest/place_read.ejs', {admin: admin_info[0], read:db_data[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_gp_delete = async (req, res) => {
    const parameters = {
        gp_key: req.params.gp_key
    }

    let check = await adminDAO.gp_gb_check(parameters);
    if(check.length == 0){
        await adminDAO.gp_delete(parameters);
        res.send(`<script>alert("삭제 완료"); location.href='/admin/manage/guest/place'</script>`);
    } else{
        res.send(`<script>alert("방명록(guestBook)이 남아있어 삭제할 수 없습니다."); location.href='/admin/manage/guest/place/read/${parameters.gp_key}'</script>`);
    }
}

const manage_gp_accept = async (req, res) => {
    const parameters = {
        gp_key: req.params.gp_key
    }
    
    await adminDAO.gp_accept(parameters);

    res.send(`<script>alert("승인 변경 완료"); location.href='/admin/manage/guest/place/read/${parameters.gp_key}'</script>`);
}





// 방명록 - 방명록
const manage_gb = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/guest/book.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_gb_list = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        offset: page.offset,
        limit: page.limit,
    }

    const pageCnt = await adminDAO.gb_list_cnt();
    const cnt = parseInt(pageCnt[0].cnt / pageSize);
    console.log(pageCnt, cnt);

    const db_data =  await adminDAO.gb_list(parameters);

    res.send({result:db_data, cnt});
}

const manage_gb_read = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        gb_key: req.params.gb_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    const db_data = await adminDAO.gb_read(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/guest/book_read.ejs', {admin: admin_info[0], read:db_data[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_gb_delete = async (req, res) => {
    const parameters = {
        gb_key: req.params.gb_key
    }

    await adminDAO.gb_delete(parameters);
    res.send(`<script>alert("삭제 완료"); location.href='/admin/manage/guest/book'</script>`);
}





// 공지사항
const manage_notice = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_notice_qna = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/qna.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}



const manage_notice_qna_list = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        offset: page.offset,
        limit: page.limit,
    }

    const pageCnt = await adminDAO.qna_list_cnt();
    const cnt = parseInt(pageCnt[0].cnt / pageSize);
    console.log(pageCnt, cnt);

    const db_data =  await adminDAO.qna_list(parameters);

    res.send({result:db_data, cnt});
}

const manage_notice_qna_read = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        qna_key: req.params.qna_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    const db_data = await adminDAO.qna_read(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/qna_read.ejs', {admin: admin_info[0], read:db_data[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_notice_qna_answer_process = async (req, res) => {
    const parameters = {
        qna_key: req.params.qna_key,
        answer: (req.body.answer == "") ? null : req.body.answer
    }

    if(parameters.answer == null){
        await adminDAO.qna_answer_update(parameters);
        res.send(`<script>alert("답변 삭제"); location.href='/admin/manage/notice/qna/read/${parameters.qna_key}';</script>`);
    }
    else {
        await adminDAO.qna_answer_update(parameters);
        res.send(`<script>alert("답변 완료"); location.href='/admin/manage/notice/qna/read/${parameters.qna_key}';</script>`);
    }
}


const manage_notice_notice = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/notice.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_notice_notice_list = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        offset: page.offset,
        limit: page.limit,
    }

    const pageCnt = await adminDAO.notice_list_cnt();
    const cnt = parseInt(pageCnt[0].cnt / pageSize);
    console.log(pageCnt, cnt);

    const db_data =  await adminDAO.notice_list(parameters);

    res.send({result:db_data, cnt});
}



const manage_notice_notice_create = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/notice_create.ejs', {admin: admin_info[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_notice_notice_create_process = async (req, res) => {
    const imgFile = req.file;

    const parameters = {
        admin_key: req.session.admin_key,
        title: req.body.title,
        content: req.body.content,
        img: (imgFile != "" && imgFile != undefined) ? (imgFile.originalname).split('.')[1] : null
    }

    try {
        const db_data = await adminDAO.notice_create(parameters);
        const notice_key = db_data.insertId

        // 선 - 이미지 업로드, 후 - key값으로 rename
        if(imgFile != undefined){
            const img = imgRename(imgFile, notice_key);

            fs.rename(`${img.dir}/${imgFile.originalname}`, `${img.dir}/${img.name}`, (err)=>{
                if(err){
                    res.send(`<script>alert("이미지 업로드 실패"); location.href='/admin/manage/notice/notice';</script>`);
                } else{
                    res.send(`<script>alert("공지사항 작성 완료");location.href='/admin/manage/notice/notice/read/${notice_key}';</script>`);
                }
            })

        } else {
            res.send(`<script>alert("공지사항 작성 완료 (이미지 X)"); location.href='/admin/manage/notice/notice/read/${notice_key}';</script>`);
        }

    } catch (err) {
        console.log(err);
    }
}

const manage_notice_notice_read = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        notice_key: req.params.notice_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    const db_data = await adminDAO.notice_read(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/notice_read.ejs', {admin: admin_info[0], read:db_data[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}


const manage_notice_notice_update = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        notice_key: req.params.notice_key
    }
    let admin_info = await adminDAO.admin_info(parameters);

    const db_data = await adminDAO.notice_read(parameters);

    if(req.session.admin_key){
        res.render('../views/admin/manage/notice/notice_update.ejs', {admin: admin_info[0], read:db_data[0]});
    } else{
        res.send("<script>location.href='/admin/login';</script>");
    }
}

const manage_notice_notice_update_process = async (req, res) => {
    const parameters = {
        admin_key: req.session.admin_key,
        notice_key: req.params.notice_key,
        title: req.body.title,
        content: req.body.content,
    }

    await adminDAO.notice_update(parameters);

    res.send(`<script>location.href='/admin/manage/notice/notice/read/${parameters.notice_key}';</script>`)
}

const manage_notice_notice_delete = async (req, res) => {
    const parameters = {
        notice_key: req.params.notice_key
    }

    await adminDAO.notice_delete(parameters);

    res.send(`<script>alert("삭제 완료"); location.href='/admin/manage/notice/notice'</script>`);
}



module.exports = {
    privacy,



    
    login,
    login_process,
    logout_process,


    main,


    manage_user,
    manage_user_list,

    manage_guest,

    manage_gp,
    manage_gp_list,
    manage_gp_read,
    manage_gp_delete,
    manage_gp_accept,

    manage_gb,
    manage_gb_list,
    manage_gb_read,
    manage_gb_delete,


    manage_notice,
    manage_notice_qna,
    manage_notice_qna_list,
    manage_notice_qna_read,
    manage_notice_qna_answer_process,

    manage_notice_notice,
    manage_notice_notice_list,
    manage_notice_notice_create,
    manage_notice_notice_create_process,
    manage_notice_notice_read,
    manage_notice_notice_update,
    manage_notice_notice_update_process,
    manage_notice_notice_delete
}