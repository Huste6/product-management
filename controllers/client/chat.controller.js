const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
const ChatSocket = require("../../socket/client/chat.socket")
const roomchat = require("../../models/room-chats.model")

//[GET] /chat/:roomChatId
module.exports.index = async (req,res) => {
    const roomChatId = req.params.roomChatId;

    // Socket 
    ChatSocket(req, res);
    // end socket

    // lay data tu db
    const chats = await Chat.find({
        room_chat_id:roomChatId,
        deleted:false
    });
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id:chat.user_id
        }).select("fullname");
        chat.infoUser = infoUser
    }
    const infoRoomChat = await roomchat.findOne({
        _id:roomChatId,
        deleted: false
    })
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",
        chats: chats,
        infoRoomChat: infoRoomChat
    })
}