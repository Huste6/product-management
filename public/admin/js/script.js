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

