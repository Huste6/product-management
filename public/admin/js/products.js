// change-status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length>0){
    const formChangeStatus= document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("data-path")
    
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status")
            const idCurrent=button.getAttribute("data-id")

            let statusChange = statusCurrent === "active" ? "inactive" : "active"
            
            const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`
            formChangeStatus.action=action;

            formChangeStatus.submit();
        });
    });
}
// end change-status

// delete item 
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-status");
    const path=formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("ban co chac muon xoa san pham nay")
            if(isConfirm){
                const id = button.getAttribute("data-id")

                const action = path + `/${id}?_method=DELETE`
                
                formDeleteItem.action=action;

                formDeleteItem.submit();
            }
        })
    })
}
// end delete item