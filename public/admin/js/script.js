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
