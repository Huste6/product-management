const User = require("../../models/user.model")
const RoomChat = require("../../models/room-chats.model")

//[GET] /room-chat
module.exports.index = async (req,res) => {
    const userID = res.locals.user.id;
    const listRoomChat = await RoomChat.find({
        typeRoom:"group",
        deleted: false,
        "users.user_id": userID
    })
    res.render("client/pages/room-chat/index",{
        pageTitle: "Danh sách phòng",
        listRoomChat: listRoomChat
    })
}
//[GET] /room-chat/create
module.exports.create = async (req,res) => {
    const listFriend = res.locals.user.listFriend;
    for (const friend of listFriend) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
            deleted: false
        }).select("fullname avatar")
        friend.infoFriend = infoFriend;
    }
    res.render("client/pages/room-chat/create",{
        pageTitle: "Tạo phòng",
        listFriend: listFriend
    })
}
//[POST] /room-chat/create
module.exports.createPost = async (req,res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataRoom = {
        title: title,
        typeRoom: "group",
        users:[]
    };
    for (const userId of usersId) {
        dataRoom.users.push({
            user_id:userId,
            role: "user"
        })
    }
    dataRoom.users.push({
        user_id:res.locals.user.id,
        role: "superAdmin"
    })
    const roomchat = new RoomChat(dataRoom);
    await roomchat.save();

    res.redirect(`/chat/${roomchat.id}`);
}