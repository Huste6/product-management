module.exports=(query)=>{
    let filterStatus = [
        {
            name: "Tat ca",
            status: "",
            class: query.status === "" || !query.status ? "active" : ""
        },
        {
            name: "Hoat dong",
            status: "active",
            class: query.status === "active" ? "active" : ""
        },
        {
            name: "Dung hoat dong",
            status: "inactive",
            class: query.status === "inactive" ? "active" : ""
        }
    ];
    return filterStatus;
}