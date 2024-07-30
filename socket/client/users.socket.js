const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chats.model");

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
            // Lấy ra độ dài accept friend của B và trả về cho B
            const infoUserB = await User.findOne({
                _id: userID
            });
            const lengthAcceptFriend = infoUserB.accessFriend.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userID: userID,
                lengthAcceptFriend: lengthAcceptFriend
            });
            // Lấy thông tin của A và trả về cho B
            const infoUserA = await User.findOne({
                _id:myUserID
            }).select("id avatar fullname");
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
                userID: userID,
                infoUserA: infoUserA
            })
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
            // Lấy ra độ dài accept friend của B và trả về cho B
            const infoUserB = await User.findOne({
                _id: userID
            });
            const lengthAcceptFriend = infoUserB.accessFriend.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userID: userID,
                lengthAcceptFriend: lengthAcceptFriend
            });
            //Lấy id của A trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
                userIDA: myUserID,
                userIDB: userID
            });
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
        // Chức năng chấp nhận yêu cầu kết bạn
        socket.on("CLIENT_ACCEPTED_FRIEND",async (userID)=>{
            const myUserID = res.locals.user.id; // ID của B
            // userID la ID cua A

            // Check exist
            const existUserAinB = await User.findOne({
                _id:myUserID,
                accessFriend: userID
            });
            const existUserBinA = await User.findOne({
                _id:userID,
                requestFriend: myUserID
            });
            // Check exist

            // Tạo phòng chat chung
            let roomChat;
            if(existUserAinB && existUserBinA){
                const dataRoom = {
                    typeRoom: "friend",
                    users:[
                        {
                            user_id:userID,
                            role: "superAdmin"
                        },
                        {
                            user_id:myUserID,
                            role: "superAdmin"
                        }
                    ],
                };
                roomChat = new RoomChat(dataRoom);
                await roomChat.save();
            }
            // Hêt Tạo phòng chat chung
            
            //Thêm user_id,room_chat_id của A vào friendList của B
            //Xóa id của A trong acceptFriend của B
            if(existUserAinB){
                await User.updateOne({
                    _id:myUserID
                },{
                    $pull: {accessFriend: userID},
                    $push: {
                        listFriend: {
                            user_id: userID,
                            room_chat_id: roomChat.id
                        }
                    }
                })
            }
            //Thêm user_id,room_chat_id của B vào friendList của A
            //Xóa id của B trong requestFriend của A
            if(existUserBinA){
                await User.updateOne({
                    _id:userID
                },{
                    $pull: {requestFriend: myUserID},
                    $push: {
                        listFriend: {
                            user_id: myUserID,
                            room_chat_id: roomChat.id
                        }
                    }
                })
            } 
        })
    })
}