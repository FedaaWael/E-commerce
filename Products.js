
var img = document.getElementById("img");
var cart = document.getElementById("cart");
var blouse = document.getElementById("blouses1");
var shoes = document.getElementById("shoes1");
var sun = document.getElementById("sunglasses")
shoes.style.display = "none";
blouse.style.display = "none";
cart.style.display = "block";
sun.style.display = "none"
function filterSelectionDresses() {
    if (blouse.style.display == "none") {
        if (cart.classList.contains("hidden")) {
            cart.classList.remove('hidden')
            cart.style.display = "none";
        }
        else {
            cart.classList.add('hidden');
            cart.style.display = "block";
        }
    }
}
function filterSelectionBlouses() {
    if (cart.style.display == "none") {
        if (blouse.classList.contains("hidden")) {
            blouse.classList.remove('hidden');
            blouse.style.display = "none";
        }
        else {
            blouse.classList.add('hidden');
            blouse.style.display = "block";
        }
    }
}

function filterSelectionShoes() {
    if (blouse.style.display == "none") {
        if (shoes.classList.contains("hidden")) {
            shoes.classList.remove('hidden');
            shoes.style.display = "none";
        }
        else {
            shoes.classList.add('hidden');
            shoes.style.display = "block";
        }
    }
}
function filterSelectionSunglasses() {
    if (shoes.style.display == "none") {
        if (sun.classList.contains("hidden")) {
            sun.classList.remove('hidden');
            sun.style.display = "none";
        }
        else {
            sun.classList.add('hidden');
            sun.style.display = "block";
        }
    }
}

//---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Select all the view buttons
    var viewButtons = document.querySelectorAll('.view-button');

    viewButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            var product = event.target.closest('#div1');
            var name = product.querySelector('.h1').textContent;
            var price = product.querySelector('.price').textContent;
            var imageSrc = product.querySelector('#img').src;

            localStorage.setItem('selectedProduct', JSON.stringify({
                name: name,
                price: price,
                imageSrc: imageSrc,
            }));

            window.location.href = 'view .html';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var storedData = JSON.parse(localStorage.getItem('loginData'));
    if (storedData && storedData.name) {
        document.querySelector(".username span").textContent = storedData.name;
    } else {
        document.querySelector(".username span").textContent = "Guest";
    }
});
