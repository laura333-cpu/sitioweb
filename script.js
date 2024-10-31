// script.js

// Código para el buscador
const searchInput = document.getElementById('searchInput');
const products = document.querySelectorAll('.product');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();

        if (productName.includes(query)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product');

    // Función de búsqueda
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            product.style.display = productName.includes(query) ? '' : 'none';
        });
    });

    const cartModal = document.querySelector('.cart-modal');
    const closeModal = document.querySelector('.cart-modal-content .close');
    let cart = [];
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Funciones para abrir y cerrar el modal del carrito
    function openCartModal() {
        cartModal.style.display = 'flex';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    // Función para actualizar el contenido del carrito
    function updateCart() {
        cartCountElement.innerText = cart.length;
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.name} - Color: ${item.color || 'N/A'} - Talla: ${item.size || 'N/A'} - Precio: ${formatCurrency(item.price)}`;
            cartItemsElement.appendChild(li);
            total += item.price; // Sumar el precio
        });

        cartTotalElement.innerText = formatCurrency(total); // Mostrar total
    }

    // Función para formatear el precio en COP
    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    }

    // Añadir eventos a todos los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productName = productElement.dataset.name;

            // Extraer el precio del párrafo de texto
            const priceText = productElement.querySelector('p').innerText;
            const productPrice = parseInt(priceText.replace(/\./g, '').replace('Precio:', '').replace(' cop', '').trim(), 10); // Convertir a número
            
            // Obtener color y talla
            const productColor = productElement.querySelector('select[id^="color"]') ? productElement.querySelector('select[id^="color"]').value : null; // Obtener color
            const productSize = productElement.querySelector('select[id^="size"]') ? productElement.querySelector('select[id^="size"]').value : null; // Obtener talla

            // Agregar el producto al carrito
            addToCart({ name: productName, color: productColor, size: productSize, price: productPrice });
            openCartModal(); // Mostrar el modal del carrito
        });
    });

    // Manejo de eventos para abrir/cerrar el modal
    document.querySelector('.cart').addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    window.onclick = function (event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    };

    // Manejo del formulario de pago
    document.getElementById('payment-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario
        const nequiPhone = document.getElementById('nequi-phone').value;
        alert(`Pago procesado a través de Nequi al número: ${nequiPhone}`);

        // Limpiar el carrito después del pago
        cart = [];
        updateCart();
        closeCartModal(); // Cerrar el modal
    });
});



// abrir cuadros en productos//

function abrirCuadro(element) {
    const imagenNueva = element.querySelector('.imagen-nueva');
    imagenNueva.style.display = 'flex'; // Muestra la nueva imagen
    element.querySelector('.imagen').style.opacity = 0; // Oculta la imagen original
}

function cerrarCuadro(element) {
    const imagenNueva = element.querySelector('.imagen-nueva');
    imagenNueva.style.display = 'none'; // Oculta la nueva imagen
    element.querySelector('.imagen').style.opacity = 1; // Muestra la imagen original
}






