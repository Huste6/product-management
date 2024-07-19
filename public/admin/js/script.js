// button-status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length>0){
    let url = new URL(window.location.href);//lay ra url

    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status=button.getAttribute("button-status")
            
            if(status){
                url.searchParams.set("status",status);
            }else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })  
    })
}
// end button-status

// form search
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)

    formSearch.addEventListener("submit",(Event)=>{
        Event.preventDefault()
        const keyword=Event.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href=url.href;
    })
}
// end form search

// pagination
const buttonPagination=document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    let url = new URL(window.location.href)
    buttonPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page)

            window.location.href = url.href;
        })
    })
}
// end pagination

// check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi]")
if(checkBoxMulti){
    const inputCheckAll=checkBoxMulti.querySelector("input[name='checkall']")
    const inputIDS= checkBoxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputIDS.forEach(input=>{
                input.checked=true;
            });
        }else{
            inputIDS.forEach(input=>{
                input.checked=false;
            });
        }
    });

    inputIDS.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputIDS.length){
                inputCheckAll.checked=true;
            }else{
                inputCheckAll.checked=false;
            }
        });
    })
}
// end check box multi

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(event)=>{
        event.preventDefault();
        
        const checkBoxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        
        const typeChange = event.target.elements.type.value

        if(typeChange=="delete-all"){
            const isConfirm = confirm("Ban co chac chan muon xoa nhung san pham nay?")
            if(!isConfirm){
                return;
            }
        }
        if(inputChecked.length > 0){
            let ids = [];
            const inputIDS = formChangeMulti.querySelector("input[name='ids']")

            inputChecked.forEach(input=>{
                const id = input.getAttribute("value");
                if(typeChange=="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`)
                    // console.log(position);
                }else{
                    ids.push(id);
                }
            });

            inputIDS.value= ids.join(", ")
            formChangeMulti.submit();
        }else{
            alert("vui lòng chọn ít nhất 1 bản ghi")
        }
    });
}
// end form change multi

// show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time);

    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}
// end show alert

// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const closeButton = document.querySelector(".close");
    const imageContainer = document.querySelector('.image-container');
    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            imageContainer.style.display = 'inline-block';
        }
    })

    closeButton.addEventListener("click",()=>{
        uploadImageInput.value='';
        uploadImagePreview.src='';
        imageContainer.style.display = 'none';
    })
}
// end upload image

// sort 
const sort = document.querySelector("[sort]")
if(sort){
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")

    sortSelect.addEventListener("change",(e)=>{
        const value = e.target.value;
        const [sortKey,sortValue] = value.split("-");
        
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;
    });

    // xoa sap xep
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    // them selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
        if(optionSelected){
            optionSelected.setAttribute("selected","true");
        }
    }
}
// end sort