// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

window.onload = function () {
    updateCartCount();
};
