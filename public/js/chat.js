import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// file upload with preview
const upload = new FileUploadWithPreview.FileUploadWithPreview('uploadImage', {
    multiple: true,
    maxFileCount: 6
});

// end file upload with preview

// CLIENT_SEND_MESSAGE
const FormSendData = document.querySelector(".chat .inner-form")
if (FormSendData) {
    FormSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray;

        if (content || images.length > 0) {
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.resetPreviewPanel();
            socket.emit("CLIENT_SEND_TYPING", "hidden")
        }
    })
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    const boxTyping = document.querySelector(".chat .inner-list-typing");
    let htmlFullname = "";
    let htmlContent = "";
    let htmlImages = "";
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        htmlFullname = `<div class="inner-name">${data.fullname}</div>`
        div.classList.add("inner-comming");
    }
    if (data.content) {
        htmlContent = `
            <div class="inner-content">${data.content}</div>
        `;
    }
    if (data.images.length > 0) {
        htmlImages = `<div class="inner-images">`;
        for (const image of data.images) {
            htmlImages += `<img src=${image}>`
        }
        htmlImages += `</div>`;
    }
    div.innerHTML = `
        ${htmlFullname}
        ${htmlContent}
        ${htmlImages}
    `
    body.insertBefore(div, boxTyping);
    body.scrollTop = bodyChat.scrollHeight
    // preview image
    const gallery = new Viewer(div);
    // end preview image
})
// END SERVER_RETURN_MESSAGE

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight
}
// End Scroll Chat to Bottom

// show icon chat
// show Popup
const buttonIcon = document.querySelector('.button-icon');
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
// end show Popup

// function show typing
var Timeout;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show")

    clearTimeout(Timeout);

    Timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden")
    }, 3000)
}
// end function show typing

// insert icon to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showTyping();
    })
}
// end insert icon to input
// end show icon chat

// typing
// input keyup
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
if (inputChat) {
    inputChat.addEventListener("keyup", () => {
        showTyping();
    })
}
// end input keyup
// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-body .inner-list-typing");
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type === "show") {
            const bodyChat = document.querySelector(".chat .inner-body");
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
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        } else if (data.type === "hidden") {
            const removeTyping = elementListTyping.querySelector(`.box-typing[userId='${data.userId}']`);
            if (removeTyping) {
                elementListTyping.removeChild(removeTyping);
            }
        }
    });
}
// END SERVER_RETURN_TYPING
// end typing

// preview full image
const bodyChatPreview = document.querySelector(".chat .inner-body");
if (bodyChatPreview) {
    const gallery = new Viewer(bodyChatPreview);
}
// end preview full image

// button delete message
const ButtonShowOption = document.querySelectorAll('.ellipsis-button');
if (ButtonShowOption.length > 0) {
    ButtonShowOption.forEach(button => {
        button.addEventListener("click", (event) => {
            const optionsMenu = event.currentTarget.nextElementSibling;
            optionsMenu.classList.toggle('hidden');

            const deleteButton = optionsMenu.querySelector('.delete-button');
            if (deleteButton && !deleteButton.dataset.listenerAttached) {
                deleteButton.addEventListener("click", () => {
                    const messageElement = button.closest('[message-id]');
                    const userIdDeleteChat = messageElement.getAttribute('message-id');
                    socket.emit("CLIENT_SEND_DELETE_ACTION", userIdDeleteChat);
                });
                deleteButton.dataset.listenerAttached = 'true'; 
            }
        });
    });
}
// end button delete message

// SERVER_RETURN_DELETE_ACTION
socket.on("SERVER_RETURN_DELETE_ACTION", (chatId) => {
    const messageIdDelete = document.querySelector(`div[message-id="${chatId}"]`);
    if(messageIdDelete){
        const bodyChatTodelete = document.querySelector('.chat .inner-body');
        bodyChatTodelete.removeChild(messageIdDelete);
    }
})
// end SERVER_RETURN_DELETE_ACTION