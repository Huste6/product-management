const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
const uploadToCloundinary = require("../../helpers/uploadToCloudinary")

//[GET] /chat
module.exports.index = async (req,res) => {
    const userId = res.locals.user.id;
    const fullname = res.locals.user.fullname;

    _io.once('connection',  (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data)=>{
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloundinary(imageBuffer);
                images.push(link);
            }
            // Luu vao db
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })
            await chat.save();
            // tra data ve client
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullname: fullname,
                content: data.content,
                images: images
            });
        })
        // typing
        socket.on("CLIENT_SEND_TYPING",async (type)=>{
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                userId: userId,
                fullname: fullname,
                type: type
            });
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