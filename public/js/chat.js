import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
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

// show icon chat
// show Popup
const buttonIcon = document.querySelector('.button-icon');
if(buttonIcon){
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
// end show Popup

// insert icon to input
const emojiPicker = document.querySelector("emoji-picker");
if(emojiPicker){
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener('emoji-click',(event)=>{
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;
    })
}
// end insert icon to input
// end show icon chat

// typing
// input keyup
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
if(inputChat){
    inputChat.addEventListener("keyup",()=>{
        socket.emit("CLIENT_SEND_TYPING","show")
        setTimeout(()=>{
            socket.emit("CLIENT_SEND_TYPING","hidden")
        },5000)
    })
}
// end input keyup
// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-body .inner-list-typing");
if(elementListTyping){
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type === "show") {
            const existTyping = elementListTyping.querySelector(`.box-typing[userId='${data.userId}']`);
            if (!existTyping) {
                const div = document.createElement("div");
                div.classList.add("box-typing");
                div.setAttribute("userId", data.userId);
                div.innerHTML = `
                    <div class="inner-name">${data.fullname}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                elementListTyping.appendChild(div);
            }
        } else if (data.type === "hidden")  {
            const removeTyping = elementListTyping.querySelector(`.box-typing[userId='${data.userId}']`);
            if (removeTyping) {
                elementListTyping.removeChild(removeTyping);
            }
        }
    });
}
// END SERVER_RETURN_TYPING
// end typing