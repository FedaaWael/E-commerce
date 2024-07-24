
document.addEventListener('DOMContentLoaded', () => {
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
    function onLoadCartNumber() {
        var productNumber = localStorage.getItem("cartNumbers");
        if (productNumber) {
            document.querySelector(".cart1 i").textContent = productNumber
        }
    }
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
        var productNumber = localStorage.getItem("cartNumbers");
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
    function setItems(product) {

        var cartItems = localStorage.getItem("productsInCart")
        cartItems = JSON.parse(cartItems)

        if (cartItems != null) {
            if (cartItems[product.name] == undefined) {
                cartItems = {
                    ...cartItems, [product.name]: product
                }
            }
            cartItems[product.name].incart += 1
        }
        else {
            product.incart = 1
            cartItems = {
                [product.name]: product
            }
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    }
    function totalCost(product) {
        // console.log(product.price)
        var cartCost = localStorage.getItem("totalCost")
        if (cartCost != null) {
            cartCost = parseInt(cartCost)
            localStorage.setItem("totalCost", cartCost + product.price)
        } else {
            localStorage.setItem("totalCost", product.price)
        }
    }
    function displayCart() {
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
            document.querySelectorAll(".delete-button").forEach(button => {
                button.addEventListener('click', function () {
                    removeProduct(this.getAttribute('data-name'));
                });
            });
            document.querySelectorAll(".increase-quantity").forEach(button => {
                button.addEventListener('click', function () {
                    increaseQuantity(this.getAttribute('data-name'));
                });
            });

            document.querySelectorAll(".decrease-quantity").forEach(button => {
                button.addEventListener('click', function () {
                    decreaseQuantity(this.getAttribute('data-name'));
                });
            });
            displayTotalCost();
        }
        function displayTotalCost() {
            var cartCost = localStorage.getItem("totalCost");
            var totalCostContainer = document.querySelector(".cart-total");

            if (cartCost && totalCostContainer) {
                totalCostContainer.innerHTML = `Total Cost: ${parseInt(cartCost).toFixed(2)}`;
            }
        }
        function removeProduct(productName) {
            var cartItems = JSON.parse(localStorage.getItem("productsInCart"));
            var cartNumbers = parseInt(localStorage.getItem("cartNumbers"));
            var cartCost = parseInt(localStorage.getItem("totalCost"));

            if (cartItems && cartItems[productName]) {
                // Update the total cost and item count
                cartNumbers -= cartItems[productName].incart;
                cartCost -= cartItems[productName].price * cartItems[productName].incart;

                // Remove the product from cart items
                delete cartItems[productName];
                // Update localStorage
                localStorage.setItem("cartNumbers", cartNumbers);
                localStorage.setItem("totalCost", cartCost);
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                // Update the displayed cart number
                document.querySelector(".cart1 i").textContent = cartNumbers;
                // Redisplay the cart to reflect changes
                displayCart();
            }
        }
    }
    function increaseQuantity(productName) {
        let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
        let cartNumbers = parseInt(localStorage.getItem("cartNumbers"));
        let cartCost = parseInt(localStorage.getItem("totalCost"));

        if (cartItems && cartItems[productName]) {
            cartItems[productName].incart += 1;
            cartNumbers += 1;
            cartCost += cartItems[productName].price;

            localStorage.setItem("cartNumbers", cartNumbers);
            localStorage.setItem("totalCost", cartCost);
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));

            document.querySelector(".cart1 i").textContent = cartNumbers;
            displayCart();
        }
    }
    function decreaseQuantity(productName) {
        let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
        let cartNumbers = parseInt(localStorage.getItem("cartNumbers"));
        let cartCost = parseInt(localStorage.getItem("totalCost"));

        if (cartItems && cartItems[productName]) {
            if (cartItems[productName].incart >= 2) {
                cartItems[productName].incart -= 1;
                cartNumbers -= 1;
                cartCost -= cartItems[productName].price;

                localStorage.setItem("cartNumbers", cartNumbers);
                localStorage.setItem("totalCost", cartCost);
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                document.querySelector(".cart1 i").textContent = cartNumbers;
                displayCart();
            }
            else {
                `<p>no</p>`
            }
        }
    }
    onLoadCartNumber();
    displayCart();
    increaseQuantity(products)
});

document.addEventListener('DOMContentLoaded', function () {
    var storedData = JSON.parse(localStorage.getItem('loginData'));
    if (storedData && storedData.name) {
        document.querySelector(".username span").textContent = storedData.name;
    } else {
        document.querySelector(".username span").textContent = "Guest";
    }
});
document.getElementById('buyNowButton').addEventListener('click', function (event) {
    var cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (!cartItems || cartItems.length === 0) {

        event.preventDefault();
        alert("Your cart is empty! Please add some products to proceed.");
    } else {

        localStorage.removeItem('cartNumbers');
        localStorage.removeItem('totalCost');
        localStorage.removeItem('productsInCart');
        window.location.replace("success.html");
    }
});

