const Chat = require("../../models/chat.model")
const uploadToCloundinary = require("../../helpers/uploadToCloudinary")

module.exports = (req, res) => {
    const userId = res.locals.user.id;
    const fullname = res.locals.user.fullname;
    const roomChatId = req.params.roomChatId;

    _io.once('connection',  (socket) => {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (data)=>{
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloundinary(imageBuffer);
                images.push(link);
            }
            // Luu vao db
            const chat = new Chat({
                user_id: userId,
                room_chat_id: roomChatId,
                content: data.content,
                images: images
            })
            await chat.save();
            // tra data ve client
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullname: fullname,
                content: data.content,
                images: images
            });
        })
        // typing
        socket.on("CLIENT_SEND_TYPING",async (type)=>{
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING",{
                userId: userId,
                fullname: fullname,
                type: type
            });
        })
        // delete chat
        socket.on("CLIENT_SEND_DELETE_ACTION", async (chatId)=>{
            // xoa tin nhan ra khoi db
            await Chat.deleteOne({
                _id: chatId
            })
            _io.emit("SERVER_RETURN_DELETE_ACTION", chatId)
        })
    })
}