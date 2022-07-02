const guestPlaceDAO = require('../model/guestPlaceDAO');

const fs = require('fs');
const {imgRename} = require('../middleware/multer');


// 메인화면 - 지역이름 5개 좋아요 순 정렬 
const gpRank = async (req, res) => {
    try {
        const db_data = await guestPlaceDAO.gpRank();
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}

// 검색
const gpSearch = async (req, res) => {
    const parameters = {
        search: req.params.search
    }
    try {
        const db_data = await guestPlaceDAO.gpSearch(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gpRead = async (req, res) => {
    const parameters = {
        place_key: req.params.num
    }
    try {
        const db_data = await guestPlaceDAO.gpRead(parameters);
        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gpCreate = async (req, res) => {
    
    const imgFile = req.file;

    const parameters = {
        user_key: req.body.user_key,
        place: req.body.place,
        address: req.body.address,
        des: req.body.des,
        img: (imgFile.originalname).split('.')[1]
    }

    console.log(parameters);

    try {
        const db_data = await guestPlaceDAO.gpCreate(parameters);
        const place_key = db_data.insertId


        // 선 - 이미지 업로드, 후 - key값으로 rename
        if(imgFile != undefined){

            const img = imgRename(imgFile, place_key);

            await fs.rename(`${img.dir}/${imgFile.originalname}`, `${img.dir}/${img.name}`, (err)=>{
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

const gpDelete = async (req, res) => {
    const parameters = {
        place_key: req.body.place_key,
        img: req.body.img
    }
    try {
        await guestPlaceDAO.gpDelete(parameters);
        fs.unlink(`public/images/guestPlace/${parameters.place_key}.${parameters.img}`, function(err){
            res.send("Delete success");
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    gpRank,
    gpSearch,
    gpRead,
    gpCreate,
    gpDelete
}