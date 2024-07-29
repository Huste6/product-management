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
const CancelFriend = (button) => {
    button.addEventListener("click",()=>{
        const userId = button.getAttribute("btn-cancel-friend");
        button.closest(".box-users").classList.remove("add");
        socket.emit("CLIENT_CANCEL_FRIEND", userId);
    })
}
const ListBtnCancelFriend = document.querySelectorAll('[btn-cancel-friend]');
if(ListBtnCancelFriend.length>0){
    ListBtnCancelFriend.forEach(button => {
        CancelFriend(button);
    })
}
// hết chức năng hủy yêu cầu

// Chức năng từ chối yêu cầu
const RefuseFriend = (button) => {
    button.addEventListener("click",()=>{
        const userId = button.getAttribute("btn-refuse-friend");
        button.closest(".box-users").classList.add("refuse");
        socket.emit("CLIENT_REFUSE_FRIEND", userId);
    })
}
const ListBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]');
if(ListBtnRefuseFriend.length>0){
    ListBtnRefuseFriend.forEach(button => {
        RefuseFriend(button);
    })
}
// hết chức năng từ chối yêu cầu

// Chức năng chấp nhận yêu cầu
const AcceptedFriend = (button)=>{
    button.addEventListener("click",()=>{
        const userId = button.getAttribute("btn-accept-friend");
        button.closest(".box-users").classList.add("accepted");
        socket.emit("CLIENT_ACCEPTED_FRIEND", userId);
    })
}
const ListBtnAcceptedFriend = document.querySelectorAll('[btn-accept-friend]');
if(ListBtnAcceptedFriend.length>0){
    ListBtnAcceptedFriend.forEach(button => {
        AcceptedFriend(button);
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

//SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND",(data) => {
    //trang loi moi da nhan
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if(dataUsersAccept){
        const userId = dataUsersAccept.getAttribute("data-users-accept");
        if(userId === data.userID){
            // Render user on the interface
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-6");
            newBoxUser.setAttribute("user-id",data.infoUserA._id)
            newBoxUser.innerHTML = `
                <div class="box-users">
                    <div class="inner-avatar">
                        <img src="${data.infoUserA.avatar}" alt="${data.infoUserA.fullname}" />
                    </div>
                    <div class="inner-info">
                        <div class="inner-name"> ${data.infoUserA.fullname} </div>
                        <div class="inner-buttons">
                            <button 
                                class="btn btn-sm btn-primary mr-1"
                                btn-accept-friend="${data.infoUserA._id}"
                            >
                            Chấp nhận
                            </button>
                            <button 
                                class="btn btn-sm btn-secondary mr-1"
                                btn-refuse-friend="${data.infoUserA._id}"
                            >
                            Xóa
                            </button>
                            <button 
                                class="btn btn-sm btn-secondary mr-1" 
                                btn-deleted-friend="" 
                                disabled=""
                            >
                            Đã xóa
                            </button>
                            <button 
                                class="btn btn-sm btn-primary mr-1" 
                                btn-accepted-friend="" 
                                disabled=""
                            >
                            Đã chấp nhận
                            </button>
                        </div>
                    </div>
                </div>
            `;
            dataUsersAccept.appendChild(newBoxUser);
            // Cancel friend request
            const buttonRefuse = newBoxUser.querySelector("[btn-refuse-friend]");
            RefuseFriend(buttonRefuse);
            // End cancel friend request
            //Accept Friend 
            const buttonAccept = newBoxUser.querySelector("[btn-accept-friend]")
            AcceptedFriend(buttonAccept);
            //End Accept Friend
        }
    }
    //trang danh sách người dùng
    const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
    if(dataUsersNotFriend){
        const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");
        if(userId === data.userID){
            const boxUSerRemove = dataUsersNotFriend.querySelector(`[user-id='${data.infoUserA._id}']`);
            if(boxUSerRemove){
                dataUsersNotFriend.removeChild(boxUSerRemove);
            }
        }
    }
});
//END SERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND",(data) =>{
    const USERIDA = data.userIDA;
    const boxUSerRemove = document.querySelector(`[user-id='${USERIDA}']`);
    if(boxUSerRemove){
        const dataUsersAccept = document.querySelector("[data-users-accept]");
        const userIDB = badgeUsersAccept.getAttribute("badge-users-accept");
        if(userIDB === data.userIDB){
            dataUsersAccept.removeChild(boxUSerRemove);
        }
    }
})
//END SERVER_RETURN_USER_ID_CANCEL_FRIEND