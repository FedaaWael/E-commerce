var email = document.getElementById("email");
var pass1 = document.getElementById("pass");
var pass2 = document.getElementById("pass3")
var form = document.getElementById("form1");
var pEmail = document.getElementById("resultEmail");
var pPassword1 = document.getElementById("resultPassword1")
var pPassword2 = document.getElementById("resultPassword2")
var username = document.getElementById("user")
var pusername = document.getElementById("resultName")

function validatePassword(pass1) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(pass1.value);
}
var isValid = true;
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (username.value.length == "" || username.value.length < 3) {
        pusername.innerHTML = "invalid Name "
        pusername.style.color = 'red';
        pusername.style.display = "block";
        username.style.border = "2px solid red";
    } else {
        pusername.style.display = "none";
        pusername.style.color = 'green';
        username.style.border = "2px solid green";
    }
    if (email.value.length == 0 || !email.value.includes("@") || !email.value.includes(".")) {
        email.style.border = "2px solid red";
        pEmail.innerHTML = "Email Must contain @ and ."
        pEmail.style.color = 'red';
        pEmail.style.display = "block";
        isValid = false;
    }
    else {
        pEmail.innerHTML = "Email is ok"
        email.style.border = "2px solid green";
        pEmail.style.display = "none";
    }
    if (validatePassword(pass1) || validatePassword(pass1) != "") {
        pPassword1.innerHTML = "Password ok"
        pPassword1.style.display = "none";
        pass1.style.border = "2px solid green";
    }
    else {
        pPassword1.innerHTML = "Password Must contain Capital Letters and numbers"
        pPassword1.style.color = 'red';
        pPassword1.style.display = "block";
        pass1.style.border = "2px solid red";

    }
    if (pass2.value == "" || pass2.value != pass1.value) {
        pPassword2.innerHTML = "invalid Confirm password"
        pPassword2.style.color = 'red';
        pass2.style.border = "2px solid red";
    } else if (pass2.value === pass1.value) {
        pPassword2.style.display = "none";
        pPassword2.style.color = 'green';
        pass2.style.border = "2px solid green";
    }
    if (isValid == true) {
        var loginData = {
            name: username.value,
            emailValue: email.value,
            pass: pass1.value,
            confirmPass: pass2.value
        };
        localStorage.setItem('loginData', JSON.stringify(loginData));
        // For demonstration: Retrieve and log the stored data
        var storedData = JSON.parse(localStorage.getItem('loginData'));
        // console.log('Stored login data:', storedData);
        if (storedData && storedData.name && storedData.emailValue && storedData.pass && storedData.confirmPass) {
            window.location.replace("Homepage.html");
        } else {
            alert("Make sure that you are fill all the fields")
        }
        if (storedData && storedData.name) {
            document.querySelector(".username span").textContent = storedData.name;
        } else {
            document.querySelector(".username span").textContent = "Welcome, Guest!";
        }

    }
})


