//permission
const tablePermission = document.querySelector("[table-permission]")
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click",()=>{
        let Rolepermission = []
        const rows = tablePermission.querySelectorAll("[data-name]")

        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if(name == "id"){
                inputs.forEach(input => {
                    const id = input.value;
                    Rolepermission.push({
                        id: id,
                        permission: []
                    })
                })
            }else{
                let index = 0;
                const permissionInput = row.querySelectorAll("input[type='checkbox']")
                permissionInput.forEach(input => {
                    if(input.checked){
                        Rolepermission[index].permission.push(name)
                    }
                    index++;
                })
            }

        })
        if(Rolepermission.length>0){
            const formchangepermission = document.querySelector("#form-change-permission");
            const input = formchangepermission.querySelector("input[name='permissions']");
            input.value = JSON.stringify(Rolepermission);
            formchangepermission.submit();
        }
    })
}
//end permission

// permission data default
const dataRecord = document.querySelector("[data-record]")
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"))
    const tablePermission = document.querySelector("[table-permission]")
    if(tablePermission){
        const rows = tablePermission.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            if(name != "id"){
                let index = 0;
                const permissionInput = row.querySelectorAll("input[type='checkbox']")
                permissionInput.forEach(input => {
                    if(record[index].permissions.includes(name)){
                        input.checked = true;
                    }
                    index++;
                })
            }
        })
    }
}
// end permission data default