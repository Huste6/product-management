// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]") 
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            
            const statusCurrent = button.getAttribute("data-status")
            const idCurrent = button.getAttribute("data-id")

            let statusChange = (statusCurrent === "active") ? "inactive" : "active"
            const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`
            
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}

// end change status

// show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = document.querySelector("[close-alert]");

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time);

    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}
// end show alert