const noticeDAO = require('../model/noticeDAO');

const fs = require('fs');
const {imgRename} = require('../middleware/multer');


// 공지사항
// type [0: 시스템 공지, 1: 이벤트 공지]
const noticeList = async (req, res) => {
    let search = req.query.search;

    if(search === undefined) search = "";

    const parameters = {
        search,
        type1: 0,
        type2: 1
    }
    
    try {
        const db_data = await noticeDAO.noticeSearch(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

// 문의사항
// type [5: 사용자 문의사항]
const qnaList = async (req, res) => {
    let search = req.query.search;

    if(search === undefined) search = "";

    const parameters = {
        search,
        type1: 5,
        type2: ''
    }
    
    try {
        const db_data = await noticeDAO.noticeSearch(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

const noticeRead = async (req, res) => {
    const parameters = {
        notice_key: req.params.num
    }

    try {
        const db_data = await noticeDAO.noticeRead(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

const getNoticeCreate = async (req, res) => {
}

const postNoticeCreate = async (req, res) => {
    
    const imgFile = req.file;

    const parameters = {
        user_key: req.body.user_key,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        img: (imgFile != undefined) ? (imgFile.originalname).split('.')[1] : undefined
    }

    console.log(parameters);

    try {
        const db_data = await noticeDAO.noticeCreate(parameters);
        const notice_key = db_data.insertId


        // 선 - 이미지 업로드, 후 - key값으로 rename
        if(imgFile != undefined){

            const img = imgRename(imgFile, notice_key);

            fs.rename(`${img.dir}/${imgFile.originalname}`, `${img.dir}/${img.name}`, (err)=>{
                if(err){
                    throw err;
                } else{
                    res.send("img uploded\ncreate success");
                }
            })

        } else res.send("create success");

    } catch (err) {
        console.log(err);
    }
}



const getNoticeUpdate = async (req, res) => {
}


const postNoticeUpdate = async (req, res) => {
    const parameters = {
        notice_key: req.params.num,
        user_key: req.body.user_key,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
    }
    console.log(parameters);
    try {
        await noticeDAO.noticeUpdate(parameters);
        res.send("update success");
    } catch (err) {
        console.log(err);
    }
}

const noticeDelete = async (req, res) => {
    const parameters = {
        notice_key: req.body.notice_key,
        img: req.body.img
    }
    try {
        await noticeDAO.noticeDelete(parameters);
        fs.unlink(`public/images/notice/${parameters.notice_key}.${parameters.img}`, function(err){
            res.send("Delete success");
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    noticeList,
    noticeRead,
    getNoticeCreate,
    postNoticeCreate,
    getNoticeUpdate,
    postNoticeUpdate,
    noticeDelete,

    qnaList
}
