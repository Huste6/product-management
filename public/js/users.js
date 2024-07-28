// Chức năng yêu cầu
const ListBtnAddFriend = document.querySelectorAll('[btn-add-friend]');
if(ListBtnAddFriend.length>0){
    ListBtnAddFriend.forEach(button => {
        button.addEventListener("click",()=>{
            const userId = button.getAttribute("btn-add-friend");
            button.closest(".box-users").classList.add("add");
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
// hết chức năng yêu cầu

// Chức năng hủy yêu cầu
const ListBtnCancelFriend = document.querySelectorAll('[btn-cancel-friend]');
if(ListBtnCancelFriend.length>0){
    ListBtnCancelFriend.forEach(button => {
        button.addEventListener("click",()=>{
            const userId = button.getAttribute("btn-cancel-friend");
            button.closest(".box-users").classList.remove("add");
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
// hết chức năng hủy yêu cầu

// Chức năng từ chối yêu cầu
const ListBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]');
if(ListBtnRefuseFriend.length>0){
    ListBtnRefuseFriend.forEach(button => {
        button.addEventListener("click",()=>{
            const userId = button.getAttribute("btn-refuse-friend");
            button.closest(".box-users").classList.add("refuse");
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
// hết chức năng từ chối yêu cầu

// Chức năng chấp nhận yêu cầu
const ListBtnAcceptedFriend = document.querySelectorAll('[btn-accept-friend]');
if(ListBtnAcceptedFriend.length>0){
    ListBtnAcceptedFriend.forEach(button => {
        button.addEventListener("click",()=>{
            const userId = button.getAttribute("btn-accept-friend");
            button.closest(".box-users").classList.add("accepted");
            socket.emit("CLIENT_ACCEPTED_FRIEND", userId);
        })
    })
}
// Hết chức năng chấp nhận yêu cầu

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if(badgeUsersAccept){
    const userID = badgeUsersAccept.getAttribute("badge-users-accept");
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data)=>{
        if(userID === data.userID){
            badgeUsersAccept.innerHTML = data.lengthAcceptFriend;
        }
    })
}
// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND