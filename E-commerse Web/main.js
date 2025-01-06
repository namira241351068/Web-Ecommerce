document.addEventListener("DOMContentLoaded", function () {
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");

    // Open Cart
    if (cartIcon) {
        cartIcon.onclick = function () {
            cart.classList.add("cart-active");
        };
    }

    // Close Cart
    if (closeCart) {
        closeCart.onclick = function () {
            cart.classList.remove("cart-active");
        };
    }

    // Initialize Cart Functions
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {
        // Remove Items From Cart
        let removeCartButtons = document.getElementsByClassName('cart-remove');
        for (let button of removeCartButtons) {
            button.addEventListener("click", removeCartItem);
        }

        // Quantity Changes
        let quantityInputs = document.getElementsByClassName('cart-quantity');
        for (let input of quantityInputs) {
            input.addEventListener("change", quantityChanged);
        }

        // Add to cart
        let addCart = document.getElementsByClassName("add-cart");
        for (let button of addCart) {
            button.addEventListener("click", addCartClicked);
        }

        // Buy Button Work
        let buyButton = document.getElementsByClassName('btn-buy')[0];
        if (buyButton) {
            buyButton.addEventListener("click", buyButtonClicked);
        }
    }

    // Buy Button
    function buyButtonClicked() {
        const totalPrice = document.getElementsByClassName('total-price')[0]?.innerText;
        alert(`Your order is placed with a total of ${totalPrice}`);
        
        // Optional: Redirect to payment page or open popup
        const popupOverlay = document.getElementById('popupOverlay');
        if (popupOverlay) {
            popupOverlay.style.display = 'block';
        }

        // Clear cart after purchase
        let cartContent = document.getElementsByClassName("cart-content")[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();
    }

    // Remove Items From Cart
    function removeCartItem(event) {
        event.target.parentElement.remove();
        updatetotal();
    }

    // Quantity Changes
    function quantityChanged(event) {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatetotal();
    }

    // Add To Cart
    function addCartClicked(event) {
        let button = event.target;
        let shopProducts = button.parentElement;
        let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
        let price = shopProducts.getElementsByClassName("price")[0].innerText;
        let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
        addProductToCart(title, price, productImg);
        updatetotal();
    }

    function addProductToCart(title, price, productImg) {
        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        let cartItems = document.getElementsByClassName("cart-content")[0];
        let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

        // Check if product already exists in the cart
        for (let name of cartItemsNames) {
            if (name.innerHTML === title) {
                alert("You have already added this to the cart.");
                return;
            }
        }

        // Cart box content
        let cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        `;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);

        // Add event listeners for remove and quantity change
        cartShopBox
            .getElementsByClassName("cart-remove")[0]
            .addEventListener("click", removeCartItem);
        cartShopBox
            .getElementsByClassName("cart-quantity")[0]
            .addEventListener("change", quantityChanged);
    }

    // Update Total
    function updatetotal() {
        let cartContent = document.getElementsByClassName('cart-content')[0];
        let cartBoxes = cartContent.getElementsByClassName('cart-box');
        let total = 0;

        for (let cartBox of cartBoxes) {
            let priceElement = cartBox.getElementsByClassName('cart-price')[0];
            let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            let price = parseFloat(priceElement.innerText.replace("Rp", "").trim());
            let quantity = parseInt(quantityElement.value);
            total += price * quantity;
        }

        total = total.toFixed(2);
        let totalPriceElement = document.getElementsByClassName('total-price')[0];
        if (totalPriceElement) {
            totalPriceElement.innerText = "Rp " + total;
        }
    }
});
