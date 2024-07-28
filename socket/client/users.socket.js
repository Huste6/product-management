const User = require("../../models/user.model");

module.exports = (res) => {
    _io.once('connection',  (socket) => {
        socket.on("CLIENT_ADD_FRIEND",async (userID)=>{
            const myUserID = res.locals.user.id;
            // userID la ID cua B

            //Thêm id của A vào acceptFriend của B
            const existUserAinB = await User.findOne({
                _id:userID,
                accessFriend: myUserID
            });
            if(!existUserAinB){
                await User.updateOne({
                    _id:userID
                },{
                    $push: {accessFriend: myUserID}
                })
            }
            //Thêm id của B vào requestFriend của A
            const existUserBinA = await User.findOne({
                _id:myUserID,
                accessFriend: userID
            });
            if(!existUserBinA){
                await User.updateOne({
                    _id:myUserID
                },{
                    $push: {requestFriend: userID}
                })
            }
            // _io.emit("SERVER_ADD_FRIEND",);
        })
    })
}