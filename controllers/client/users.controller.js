const User = require("../../models/user.model")
const UserSocket = require("../../socket/client/users.socket")

//[GET] /users/not-friend
module.exports.notFriend = async (req,res) => {
    // socket
    UserSocket(res);
    // socket io
    const userID = res.locals.user.id;

    const myUserID = await User.findOne({
        _id:userID
    });

    const requestFriend = myUserID.requestFriend;
    const acceptFriend = myUserID.accessFriend;
    const listFriend = myUserID.listFriend;

    const users = await User.find({
        $and:[
            { _id: {$ne: userID} },
            { _id: {$nin: requestFriend} },
            { _id: {$nin: acceptFriend} },
            { _id: {$nin: listFriend.map(friend => friend.user_id)} }
        ],
        status:"active",
        deleted: false
    }).select("id avatar fullname");
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}
//[GET] /users/request
module.exports.request = async (req,res) =>{
    // socket
    UserSocket(res);
    // socket io
    const userID = res.locals.user.id;

    const myUserID = await User.findOne({
        _id:userID
    });

    const requestFriend = myUserID.requestFriend;
    const acceptFriend = myUserID.accessFriend;

    const users = await User.find({
        _id: {$in: requestFriend},
        status:"active",
        deleted: false
    }).select("id avatar fullname");

    res.render("client/pages/users/request", {
        pageTitle: "Danh sách người dùng",
        users:users
    });
}
//[GET] /users/accept
module.exports.accept = async (req,res)=>{
    // socket
    UserSocket(res);
    // socket io
    const userID = res.locals.user.id;

    const myUserID = await User.findOne({
        _id:userID
    });

    const acceptFriend = myUserID.accessFriend;

    const users = await User.find({
        _id: {$in: acceptFriend},
        status:"active",
        deleted: false
    }).select("id avatar fullname");

    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời đã nhận",
        users:users
    });
}