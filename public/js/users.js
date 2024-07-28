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