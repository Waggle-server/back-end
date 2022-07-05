const guestBookDAO = require('../model/guestBookDAO');

const fs = require('fs');
const {imgRename} = require('../middleware/multer');


const paging = (currentPage, pageSize) => {
    const default_start_page = 0;
    const page_size = pageSize;
    if (currentPage < 0 || !currentPage) currentPage = default_start_page;

    let result = {
        offset: (currentPage) * page_size,
        limit: Number(page_size)
    }

    return result;
}

// 메인화면, 검색 - 10개씩 스크롤 페이징
const gbSearch = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        place: (req.query.place == undefined) ? "" : req.query.place,
        offset: page.offset,
        limit: page.limit
    }

    console.log(parameters);

    try {
        const db_data = await guestBookDAO.gbSearch(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

const gbRead = async (req, res) => {
    const parameters = {
        gb_key: req.params.num
    }
    try {
        const db_data = await guestBookDAO.gbRead(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

const gbList = async (req, res) => {

    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        gp_key: req.params.num,
        offset: page.offset,
        limit: page.limit
    }
    try {
        const db_data = await guestBookDAO.gbList(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gbMyList = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        user_key: req.params.num,
        offset: page.offset,
        limit: page.limit
    }
    try {
        const db_data = await guestBookDAO.gbMyList(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gbCreate = async (req, res) => {
    const imgFile = req.file;

    const parameters = {
        gp_key: req.body.gp_key,
        user_key: req.body.user_key,
        comment: req.body.comment,
        img: (imgFile != undefined) ? (imgFile.originalname).split('.')[1] : undefined
    }
    console.log(parameters);

    try {
        const db_data = await guestBookDAO.gbCreate(parameters);
        const gb_key = db_data.insertId

        // 선 - 이미지 업로드, 후 - key값으로 rename
        if(imgFile != undefined){

            const img = imgRename(imgFile, gb_key);

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


const gbUpdate = async (req, res) => {
    const parameters = {
        gb_key: req.body.gb_key,
        comment: req.body.comment,
    }
    console.log(parameters);
    try {
        await guestBookDAO.gbUpdate(parameters);
        res.send("update success");
    } catch (err) {
        console.log(err);
    }
}

const gbDelete = async (req, res) => {
    const parameters = {
        gb_key: req.body.gb_key,
        img: req.body.img
    }
    try {
        await guestBookDAO.gbDelete(parameters);
        fs.unlink(`public/images/guestBook/${parameters.gb_key}.${parameters.img}`, function(err){
            res.send("Delete success");
        })
    } catch (err) {
        console.log(err);
    }
}


const gbHeart = async (req, res) => {
    const parameters = {
        gb_key: req.body.gb_key,
        user_key: req.body.user_key,
    }
    console.log(req.body)
    try {
        db_data = await guestBookDAO.gbHeart_check(parameters);
        if(db_data.length == 0){
            await guestBookDAO.gbHeart_insert(parameters);
        } else{
            await guestBookDAO.gbHeart_update(parameters);
        }

        res.send("heart change");
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    gbSearch,
    gbRead,
    gbList,
    gbMyList,

    gbCreate,
    gbUpdate,
    gbDelete,

    gbHeart
}