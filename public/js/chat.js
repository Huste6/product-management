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