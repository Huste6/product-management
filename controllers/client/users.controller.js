const User = require("../../models/user.model")

//[GET] /users/not-friend
module.exports.notFriend = async (req,res) => {
    const userID = res.locals.user.id;

    const users = await User.find({
        _id: {$ne: userID},
        status:"active",
        deleted: false
    }).select("id avatar fullname");
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}