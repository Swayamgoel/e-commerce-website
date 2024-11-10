
// cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const updateCartSummary = () => {
    const cartItemsList = document.getElementById("cart-items");
    if (cartItemsList) {
        cartItemsList.innerHTML = ""; 

        let totalItems = 0;
        let totalAmount = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalAmount += item.quantity * item.price;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="${200}" height="${200}"   class="cart-item-image">
                <span>${item.name} (x${item.quantity}) - $${(item.quantity * item.price).toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${item.id}">REMOVE</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        document.getElementById("total-items").textContent = totalItems;
        document.getElementById("total-amount").textContent = totalAmount.toFixed(2);

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function() {
                const productId = this.getAttribute("data-id");
                removeFromCart(productId);
            });
        });
    }
};

// Function to add items to the cart
const addToCart = (productId, name, price, quantity, image) => {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, name, price, quantity, image });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();


    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
        const addToCartButton = productCard.querySelector(".add-to-cart");
        const goToCartButton = productCard.querySelector(".go-to-cart");

        addToCartButton.style.display = "inline-block";
        goToCartButton.style.display = "none";
    }
};

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        const productCard = this.closest(".product-card");
        const productId = productCard.getAttribute("data-id");
        const name = productCard.querySelector("h3").textContent;
        const price = parseFloat(productCard.getAttribute("data-price"));
        const quantity = parseInt(productCard.querySelector("input[type='number']").value);
        const image = productCard.querySelector("img").src;

        addToCart(productId, name, price, quantity, image);

        this.style.display = "none";
        productCard.querySelector(".go-to-cart").style.display = "inline-block";
    });
});

document.addEventListener("DOMContentLoaded", updateCartSummary);
