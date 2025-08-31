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

const galeria = document.getElementById("galeria");

productos.forEach(producto => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
  `;
  galeria.appendChild(div);
});

let index = 0;
const total = productos.length;

document.querySelector(".arrow.left").addEventListener("click", () => {
  index = (index - 1 + total) % total;
  updateGaleria();
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  index = (index + 1) % total;
  updateGaleria();
});

function updateGaleria() {
  const offset = -index * 300;
  galeria.style.transform = `translateX(${offset}px)`;
}
