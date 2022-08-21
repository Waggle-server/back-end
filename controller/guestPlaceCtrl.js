const guestPlaceDAO = require('../model/guestPlaceDAO');
const logDAO = require('../model/logDAO');

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
        search: (req.query.search == undefined) ? "" : req.query.search,
        user_key: req.get('user_key')
    }
    try {
        const db_data = await guestPlaceDAO.gpSearch(parameters);

        // 로그
        if(parameters.search != "" && parameters.user_key != null){
            parameters.log = parameters.search
            await logDAO.search(parameters)
        }

        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gpRead = async (req, res) => {
    const parameters = {
        gp_key: req.params.num
    }
    try {
        const db_data = await guestPlaceDAO.gpRead(parameters);

        parameters.user_key = req.get('user_key')

        // 로그
        if(db_data.length != 0 && parameters.user_key != null){
            parameters.log = db_data[0].place
            
            await logDAO.read(parameters)
        }

        res.send({result : db_data});
    } catch (err) {
        console.log(err);
    }
}


const gpCreate = async (req, res) => {
    
    const imgFile = req.file;

    const parameters = {
        user_key: req.get('user_key'),
        place: req.body.place,
        address: req.body.address,
        des: req.body.des,
        img: (imgFile != "" && imgFile != undefined) ? (imgFile.originalname).split('.')[1] : null
    }

    console.log(parameters);

    try {
        if(parameters.user_key != null){
            // 선 - 이미지 업로드, 후 - key값으로 rename
            if(imgFile != null){

                const db_data = await guestPlaceDAO.gpCreate(parameters);
                const gp_key = db_data.insertId

                const img = imgRename(imgFile, gp_key);

                fs.rename(`${img.dir}/${imgFile.originalname}`, `${img.dir}/${img.name}`, async (err)=>{
                    if(err){
                        console.log(err)
                        res.send({result: "img upload err"});
                    } else{
                        // 로그
                        parameters.log = parameters.place
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



const gpDelete = async (req, res) => {
    const parameters = {
        gp_key: req.body.gp_key,
        img: req.body.img
    }
    try {
        await guestPlaceDAO.gpDelete(parameters);
        fs.unlink(`public/images/guestPlace/${parameters.gp_key}.${parameters.img}`, function(err){
            res.send({result: true});
        })
    } catch (err) {
        console.log(err);
    }
}



const gpHeart = async (req, res) => {
    const parameters = {
        gp_key: req.body.gp_key,
        user_key: req.get('user_key'),
    }
    
    try {
        if(parameters.user_key != null){
            let db_data = await guestPlaceDAO.gpHeart_check(parameters);
            if(db_data.length == 0){
                await guestPlaceDAO.gpHeart_insert(parameters);
            } else{
                await guestPlaceDAO.gpHeart_update(parameters);
            }

            // 로그
            db_data = await guestPlaceDAO.gpHeart_log(parameters)
            if(db_data[0].heart == 1){
                parameters.log = db_data[0].place
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
    gpRank,
    gpSearch,
    gpRead,
    gpCreate,
    gpDelete,

    gpHeart
}

