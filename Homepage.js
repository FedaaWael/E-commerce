var currentindex = 0;
var img = document.querySelectorAll("#slideshow img");
var slideshowinterval;
var slides = document.querySelector('#slideshow');
var button = document.getElementById("btn1");
var Name = document.querySelector("#name");
function showimg(ind) {
    img.forEach((img, i) => {
        img.style.display = (i === ind) ? 'block' : 'none';

    });
}
function nextimg() {
    currentindex = (currentindex + 1) % img.length;
    showimg(currentindex);
}
function previmg() {
    currentindex = (currentindex - 1 + img.length) % img.length;
    showimg(currentindex)
}

slideshowinterval = setInterval(nextimg, 5000);
showimg(currentindex);

function submit() {
    // e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const userName = emailInput.split('@')[0];
    document.getElementById('userName').textContent = Name;
};
// var button1 = document.getElementById("btn");
function logout() {
    window.location.replace("Login .html")
}

document.addEventListener('DOMContentLoaded', function () {
    var storedData = JSON.parse(localStorage.getItem('loginData'));
    if (storedData && storedData.name) {
        document.querySelector(".username span").textContent = storedData.name;
    } else {
        document.querySelector(".username span").textContent = "Guest";
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var goToStartButton = document.getElementById('goToStartPage');
    goToStartButton.addEventListener('click', function () {
        window.location.href = 'Homepage.html';
    });
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            goToStartButton.style.display = 'block';
        } else {
            goToStartButton.style.display = 'none';
        }
    });
});
