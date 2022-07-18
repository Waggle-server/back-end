const axios = require('axios').default;

const userDAO = require('../model/userDAO');


const userProfile = async (req, res) => {
    // const accessToken = req.body.accessToken;

    let profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: "Bearer qIZOJpmvQ6IbMwKHfe-J-5VX8YaCQockgwym2nEUCilwUAAAAYIMFO1d"
        }
        // headers: {
        //     Authorization: `Bearer ${accessToken}`
        // }
    })
        .then(function (res) {
            const parameters = {
                id: res.data.id,
                nickname: res.data.properties.nickname,
                img: res.data.properties.profile_image
            }
            console.log(parameters);
            return parameters;
        })
        .catch(function (err) {
            console.log(err);
        })
    
    console.log(profile);

    db_data = await userDAO.exist_id(profile);

    if(db_data.length != 0){
        res.send("already exist")
    } else {
        await userDAO.insert_profile(profile);
        res.send("성공")
    }    
}


module.exports = {
    userProfile
}