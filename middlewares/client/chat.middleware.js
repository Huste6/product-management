const roomChat = require("../../models/room-chats.model")

module.exports.isAccess = async (req,res,next)=>{
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;
    const ExistUserInRoomchat = await roomChat.findOne({
        _id:roomChatId,
        deleted: false,
        "users.user_id": userId
    });
    if(ExistUserInRoomchat){
        next();
    }else{
        res.redirect('/');
    }
    
} 