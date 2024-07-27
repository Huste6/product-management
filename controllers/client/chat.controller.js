const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

//[GET] /chat
module.exports.index = async (req,res) => {
    const userId = res.locals.user.id;
    _io.on('connection',  (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content)=>{
            // Luu vao db
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save();
        })
    })
    // lay data tu db
    const chats = await Chat.find({
        deleted:false
    });
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id:chat.user_id
        }).select("fullname");
        chat.infoUser = infoUser
    }
    
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",
        chats: chats
    })
}