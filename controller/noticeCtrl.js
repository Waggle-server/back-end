const noticeDAO = require('../model/noticeDAO');

/*
router.get('/list', noticeCtrl.noticeList);
router.get('/read/:num', noticeCtrl.noticeRead);

router.get('/create', noticeCtrl.getNoticeCreate);
router.post('/create', noticeCtrl.postNoticeCreate);

router.get('/update/:num', noticeCtrl.getNoticeUpdate);
router.post('/update/:num', noticeCtrl.postNoticeUpdate);

router.post('/delete/:num', noticeCtrl.noticeDelete);

*/



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
    const parameters = {
        user_key: req.body.user_key,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type
    }
    try {
        await noticeDAO.noticeWrite(parameters);
        res.send("write success");

        // 알림 추가
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
        type: req.body.type
    }
    try {
        const db_data = await noticeDAO.noticeUpdate(parameters);
        res.send("update success");
    } catch (err) {
        console.log(err);
    }
}

const noticeDelete = async (req, res) => {
    const parameters = {
        notice_key: req.body.notice_key,
    }
    try {
        const db_data = await noticeDAO.noticeDelete(parameters);
        res.send("delete success");
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
