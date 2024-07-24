
var carts = document.querySelectorAll(".add-cart");
var products = [{
    name: 'Green&White Dress',
    price: 400,
    incart: 0,
},
{
    name: 'Green & Beige Dress',
    price: 500,
    incart: 0,

},
{
    name: 'Blue Dress with white belt',
    price: 1000,
    incart: 0,
},
{
    name: 'Colorful Blouse',
    price: 300,
    incart: 0,
},
{
    name: 'Blue &White Blouse',
    price: 500,
    incart: 0
},
{
    name: 'Black & White Blouse',
    price: 600,
    incart: 0
},
{
    name: 'Beige Shoes',
    price: 400,
    incart: 0
},
{
    name: 'Black & White Shoes',
    price: 500,
    incart: 0
},
{
    name: 'Black Shoes',
    price: 1000,
    incart: 0
},
{
    name: 'Dark Pink Sunglasses',
    price: 300,
    incart: 0
},
{
    name: 'Pink Sunglasses',
    price: 200,
    incart: 0
},
{
    name: 'Purple Sunglasses',
    price: 1000,
    incart: 0
},
]
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the product details from localStorage
    var product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        // Display the product details
        document.getElementById('product-name').innerHTML = `<span> ${product.name}</span>`
        document.getElementById('price').textContent = `${product.price}`;
        document.getElementById('product-image').src = product.imageSrc;

        document.querySelector('.add-cart').addEventListener('click', () => {
            for (let i = 0; i < carts.length; i++) {
                carts[i].addEventListener('click', () => {
                    var selectedSizeElement = document.querySelectorAll(".product-size")[i];
                    if (selectedSizeElement) {
                        var selectedSize = selectedSizeElement.value;
                        products[i].size = selectedSize;
                    } else {
                        products[i].size = "Small";
                    }
                    cartNumber(products[i]);
                    totalCost(products[i]);
                    alert("Your product add to cart");

                })
            }
            function cartNumber(product) {

                let productNumber = localStorage.getItem("cartNumbers");
                productNumber = parseInt(productNumber)
                if (productNumber) {
                    localStorage.setItem("cartNumbers", productNumber + 1)
                    document.querySelector(".cart1 i").textContent = productNumber + 1
                }
                else {
                    localStorage.setItem("cartNumbers", 1);
                    document.querySelector(".cart1 i").textContent = 1
                }
                setItems(product);
            }
        });
    } function displayCart() {
        var productContainer = document.querySelector(".products")
        var cartItems = localStorage.getItem("productsInCart")
        cartItems = JSON.parse(cartItems);
        // console.log(cartItems)
        if (cartItems && productContainer) {
            productContainer.innerHTML = "";
            Object.values(cartItems).forEach(item => {
                productContainer.innerHTML += `
                <div>
            <img src="./Images/${item.name}.webp" alt="${item.name}">
                        <div class="span">
                        <span class="nameOfProduct">Name : ${item.name}</span>
                        <br>
                        <span>Price : ${item.price} L.E</span>
                        <br>
                        <span class="size">Size: ${item.size}</span>
                        <br>
                        <span>Quantity: ${item.incart}</span>
                        <br>
                        <span>Total for this item: ${(item.price * item.incart).toFixed(2)}</span>
                        <br>
                        <button class="increase-quantity" data-name="${item.name}">+</button>
                        <button class="decrease-quantity" data-name="${item.name}">-</button>
                        <button class="delete-button" data-name="${item.name}">Remove</button>
                        </div>
                    </div>`

            });
        }
    }
    displayCart();
});

document.addEventListener('DOMContentLoaded', function () {
    var storedData = JSON.parse(localStorage.getItem('loginData'));
    if (storedData && storedData.name) {
        document.querySelector(".username span").textContent = storedData.name;
    } else {
        document.querySelector(".username span").textContent = "Guest";
    }
});

