//[GET] /room-chat
module.exports.index = async (req,res) => {
    res.render("client/pages/room-chat/index",{
        pageTitle: "Danh sách phòng"
    })
}
