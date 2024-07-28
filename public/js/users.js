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