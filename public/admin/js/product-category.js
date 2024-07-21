// delete item
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
    buttonDelete.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("ban co chac muon xoa danh muc san pham nay khong!")
            if(isConfirm){
                const formDeleteItem=document.querySelector("#form-delete-product-category");
                const path=formDeleteItem.getAttribute("data-path")
                const id = button.getAttribute("data-id")
                formDeleteItem.action = path + `/${id}?_method=DELETE`
                formDeleteItem.submit();
            }
        })
    })
}
// end delete item