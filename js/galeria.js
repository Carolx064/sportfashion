const productos = [
  { nombre: "Camiseta Airflex", precio: "89.99€", imagen: "../imagenes/g-1.png" },
  { nombre: "Camiseta Fit", precio: "49.99€", imagen: "../imagenes/g-2.png" },
  { nombre: "Sudadera Monster", precio: "59.99€", imagen: "../imagenes/g-3.jpeg" },
  { nombre: "Zapatillas Flex", precio: "29.99€", imagen: "../imagenes/g-4.jpeg" },
  { nombre: "Gorra Sport", precio: "79.99€", imagen: "../imagenes/g-5.jpg" },
  { nombre: "Pantalon Liso", precio: "19.99€", imagen: "../imagenes/g-6.jpg" },
  { nombre: "Bolsa Munich", precio: "24.99€", imagen: "../imagenes/g-7.jpg" },
  { nombre: "Sudadera Azul", precio: "14.99€", imagen: "../imagenes/g-8.jpg" }
];

// --- Carrusel ---
const galeria = document.getElementById("galeria");
let index = 0;

function mostrarProducto(i) {
  const p = productos[i];
  galeria.innerHTML = `
    <div class="producto">
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.precio}</p>
      <button class="add-to-cart">🛒 Añadir al carrito</button>
    </div>
  `;

  // evento del botón
  galeria.querySelector(".add-to-cart").addEventListener("click", () => {
    const precioNum = parseFloat(p.precio.replace("€", "").trim());
    carrito.push({ ...p, precioNum });
    totalCarrito += precioNum;
    actualizarCarrito();
  });
}

// Flechas
document.querySelector(".arrow.left").addEventListener("click", () => {
  index = (index - 1 + productos.length) % productos.length;
  mostrarProducto(index);
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  index = (index + 1) % productos.length;
  mostrarProducto(index);
});

// Inicializar carrusel
mostrarProducto(index);

// --- Carrito ---
const cartTotal = document.getElementById("cart-total");
const cartSum = document.getElementById("cart-sum");
const cartDropdown = document.getElementById("cart-dropdown");
const cartIcon = document.getElementById("cart-icon");
const cartItemsList = document.getElementById("cart-items");

let totalCarrito = 0;
let carrito = [];

// Abrir/cerrar carrito desplegable
cartIcon.addEventListener("click", () => {
  cartDropdown.parentElement.classList.toggle("active");
});

// Actualizar carrito
function actualizarCarrito() {
  cartItemsList.innerHTML = "";
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.precio}
      <button class="remove-item" data-index="${i}">❌</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = totalCarrito.toFixed(2) + " €";
  cartSum.textContent = totalCarrito.toFixed(2) + " €";

  // Botones eliminar
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      totalCarrito -= carrito[i].precioNum;
      carrito.splice(i, 1);
      actualizarCarrito();
    });
  });
}
