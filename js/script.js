


const validEmail = "admin@techzone.com";


const validPasswordHash = btoa("Admin123");


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const rememberCheck = document.getElementById("remember");
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");


window.onload = function () {

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheck.checked = true;
    }

};


togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});


function showMessage(text, type) {

    message.className = "";

    message.classList.add(type);

    message.innerHTML = text;

}

function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    if (email === "" || password === "") {

        showMessage(
            "Please enter both email and password.",
            "error"
        );

        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showMessage(
            "Please enter a valid email address.",
            "warning"
        );

        return;
    }

  
    if (password.length < 8) {

        showMessage(
            "Password must contain at least 8 characters.",
            "warning"
        );

        return;
    }

  
    if (rememberCheck.checked) {

        localStorage.setItem("rememberedEmail", email);

    } else {

        localStorage.removeItem("rememberedEmail");

    }


    loginButton.disabled = true;

    loginButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging In...';

    setTimeout(function () {

        const enteredHash = btoa(password);

        if (
            email === validEmail &&
            enteredHash === validPasswordHash
        ) {

            showMessage(
                "Login Successful!",
                "success"
            );

        } else {

            showMessage(
                "Invalid email or password.",
                "error"
            );

        }

        loginButton.disabled = false;
        loginButton.innerHTML = "Login";

    }, 1800);

}