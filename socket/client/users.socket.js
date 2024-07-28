const User = require("../../models/user.model");

module.exports = (res) => {
    _io.once('connection',  (socket) => {
        // Chức năng yêu cầu
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
                requestFriend: userID
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
        // Chức năng hủy yêu cầu
        socket.on("CLIENT_CANCEL_FRIEND",async (userID)=>{
            const myUserID = res.locals.user.id;
            // userID la ID cua B

            //hủy id của A vào acceptFriend của B
            const existUserAinB = await User.findOne({
                _id:userID,
                accessFriend: myUserID
            });
            if(existUserAinB){
                await User.updateOne({
                    _id:userID
                },{
                    $pull: {accessFriend: myUserID}
                })
            }
            //hủy id của B vào requestFriend của A
            const existUserBinA = await User.findOne({
                _id:myUserID,
                requestFriend: userID
            });
            if(existUserBinA){
                await User.updateOne({
                    _id:myUserID
                },{
                    $pull: {requestFriend: userID}
                })
            } 
        })
        // Chức năng từ chối yêu cầu
        socket.on("CLIENT_REFUSE_FRIEND",async (userID)=>{
            const myUserID = res.locals.user.id; // ID của B
            // userID la ID cua A

            //hủy id của A vào acceptFriend của B
            const existUserAinB = await User.findOne({
                _id:myUserID,
                accessFriend: userID
            });
            if(existUserAinB){
                await User.updateOne({
                    _id:myUserID
                },{
                    $pull: {accessFriend: userID}
                })
            }
            //hủy id của B vào requestFriend của A
            const existUserBinA = await User.findOne({
                _id:userID,
                requestFriend: myUserID
            });
            if(existUserBinA){
                await User.updateOne({
                    _id:userID
                },{
                    $pull: {requestFriend: myUserID}
                })
            } 
        })
    })
}