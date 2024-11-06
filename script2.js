// Lógica del carrito de compras en Bolivianos
let cart = [];
const cartBtn = document.getElementById("carrito-btn");
const cartModal = document.getElementById("carrito-modal");
const closeModal = document.querySelector(".close");
const cartItemsList = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");

// Abrir y cerrar el modal del carrito
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Añadir productos al carrito
const addToCartButtons = document.querySelectorAll(".comprar-btn");

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price")); // Precio en Bolivianos
        
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCart();
    });
});

// Actualizar el carrito
function updateCart() {
    let totalQuantity = 0;
    let totalPrice = 0;
    
    
    cartItemsList.innerHTML = ""; // Limpiar la lista antes de volver a renderizar

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - Bs ${item.price * item.quantity}`;
        cartItemsList.appendChild(li);
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    totalPriceEl.textContent = totalPrice.toFixed(2);
    cartCountEl.textContent = totalQuantity;
}

// Finalizar compra (puede ser un simple alert o integración con un sistema de pago)
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
        alert(`Compra finalizada. Total a pagar: Bs ${totalPriceEl.textContent}`);
        cart = []; // Vaciar el carrito tras la compra
        updateCart(); // Actualizar la vista del carrito
        cartModal.style.display = "none"; // Cerrar el modal
    } else {
        alert("El carrito está vacío.");
    }
});

// Cerrar el modal cuando se hace clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target == cartModal) {
        cartModal.style.display = "none";
    }
});