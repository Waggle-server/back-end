const guestBookDAO = require('../model/guestBookDAO');
const logDAO = require('../model/logDAO');

const fs = require('fs');
const { imgRename } = require('../middleware/multer');
const { paging } = require('./tool/paging');



// 메인화면, 검색 - 10개씩 스크롤 페이징
const gbSearch = async (req, res) => {
    let currentPage = req.query.page;
    const pageSize = 10;
    const page = paging(currentPage, pageSize);

    const parameters = {
        search: (req.query.search == undefined) ? "" : req.query.search,
        offset: page.offset,
        limit: page.limit,
        user_key: (req.get('user_key') != "" && req.get('user_key') != undefined) ? req.get('user_key') : null 
    }

    console.log(parameters);

    try {
        // 로그
        if(parameters.search != "" && parameters.user_key != null){
            parameters.log = parameters.search
            await logDAO.search(parameters)
        }

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
        parameters.user_key = (req.get('user_key') != "" && req.get('user_key') != undefined) ? req.get('user_key') : null 

        const db_data = await guestBookDAO.gbRead(parameters);

        // 로그
        if(db_data.length != 0 && parameters.user_key != null){
            parameters.log = db_data[0].place + "," + db_data[0].comment
            
            await logDAO.read(parameters)
        }

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

    let parameters = {
        gp_key: req.body.gp_key,
        user_key: (req.get('user_key') != "" && !isNaN(req.get('user_key'))) ? null : req.get('user_key'),
        comment: req.body.comment,
        img: (imgFile != undefined) ? (imgFile.originalname).split('.')[1] : undefined
    }
    console.log(parameters);

    try {
        if(parameters.user_key != null){
            // 선 - 이미지 업로드, 후 - key값으로 rename
            if(imgFile != undefined){
                let db_data = await guestBookDAO.gbCreate(parameters);
                const gb_key = db_data.insertId

                parameters.gb_key = gb_key

                const img = imgRename(imgFile, gb_key);

                fs.rename(`${img.dir}/${imgFile.originalname}`, `${img.dir}/${img.name}`, async (err)=>{
                    if(err){
                        console.log(err)
                        res.send({result: "img upload err"});
                    } else{
                        // 로그
                        db_data = await guestBookDAO.gbRead(parameters)
                        parameters.log = db_data[0].place + "," + parameters.comment
                        await logDAO.create(parameters)

                        res.send({result: "success"});
                    }
                })
            } else {
                res.send({result: "img null"});
            } 
        } else {
            res.send({result: "user null"});
        }
        

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
        res.send({result: true});
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
            res.send({result: true});
        })
    } catch (err) {
        console.log(err);
    }
}


const gbHeart = async (req, res) => {
    const parameters = {
        gb_key: req.body.gb_key,
        user_key: (req.get('user_key') != "" && !isNaN(req.get('user_key'))) ? null : req.get('user_key')
    }
    console.log(req.body)
    try {
        if(parameters.user_key != null){
            let db_data = await guestBookDAO.gbHeart_check(parameters);
            if(db_data.length == 0){
                await guestBookDAO.gbHeart_insert(parameters);
            } else{
                await guestBookDAO.gbHeart_update(parameters);
            }

            // 로그
            db_data = await guestBookDAO.gbHeart_log(parameters)
            if(db_data[0].heart == 1){
                parameters.log = db_data[0].place +","+ db_data[0].comment
                await logDAO.heart(parameters)
            }
            res.send({result: "success"});
        } else{
            res.send({result: "user null"});
        }
        
    } catch (err) {
        console.log(err);
    }
}





module.exports = {
    gbSearch,
    gbList,
    gbMyList,
    gbRead,

    gbCreate,
    gbUpdate,
    gbDelete,

    gbHeart,
}