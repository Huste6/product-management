// CLIENT_SEND_MESSAGE
const FormSendData = document.querySelector(".chat .inner-form")
if(FormSendData){
    FormSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value = "";
        }
    })
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE",(data)=>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    let htmlFullname = "";
    if(myId == data.userId){
        div.classList.add("inner-outgoing");
    }else{       
        htmlFullname = `<div class="inner-name">${data.fullname}</div>`
        div.classList.add("inner-comming");
    }
    div.innerHTML = `
        ${htmlFullname}
        <div class="inner-content">${data.content}</div>
    `
    body.appendChild(div);
    body.scrollTop = bodyChat.scrollHeight
})
// END SERVER_RETURN_MESSAGE

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight
}
// End Scroll Chat to Bottom