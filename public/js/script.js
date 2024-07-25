// show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}
// end show alert
// xác nhận mật khẩu 
const formRegister = document.querySelector("[form-register]")
if (formRegister) {
    formRegister.addEventListener("submit", (event) => {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        if (password != confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không trùng khớp.");
            event.preventDefault();
        }
    })
}
// kết thúc phần xác nhận mật khẩu
// phần xem mật khẩu
const showPasswordCheckboxes = document.querySelectorAll("[show-password]");
showPasswordCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const input = this.closest('.form-group').querySelector('input[type="password"], input[type="text"]');
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
});
// kết thúc phần xem mật khẩu