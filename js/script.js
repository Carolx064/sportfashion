// =========================
// NOTICIAS
// =========================
const RUTA_JSON = 'data/noticias.json';

async function cargarNoticias() {
  try {
    const respuesta = await fetch(RUTA_JSON);

    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar el archivo (${respuesta.status} ${respuesta.statusText})`);
    }

    const noticias = await respuesta.json();
    console.log('Noticias cargadas:', noticias);
    mostrarNoticias(noticias);

  } catch (error) {
    console.error('Error al cargar las noticias:', error);
    mostrarErrorEnPantalla('No se pudieron cargar las noticias. Verifica que el archivo exista en "data/noticias.json".');
  }
}

function mostrarNoticias(noticias) {
  const contenedor = document.getElementById('contenedor-noticias');
  if (!contenedor) return; // evita error si no hay sección noticias
  contenedor.innerHTML = '';

  noticias.forEach(noticia => {
    const item = document.createElement('div');
    item.classList.add('noticia');
    item.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p>${noticia.contenido}</p>
    `;
    contenedor.appendChild(item);
  });
}

function mostrarErrorEnPantalla(mensaje) {
  const contenedor = document.getElementById('contenedor-noticias');
  if (!contenedor) return;
  contenedor.innerHTML = `<p style="color:red;">${mensaje}</p>`;
}

cargarNoticias();

// =========================
// CARRITO DE COMPRAS
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const carrito = document.querySelector("#carrito tbody");
  const listaProductos = document.querySelectorAll(".agregar-carrito");
  const vaciarBtn = document.querySelector("#vaciar-carrito");
  const contador = document.getElementById("contador-carrito");
  const totalCarrito = document.getElementById("total-carrito");

  let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // =========================
  // Funciones
  // =========================
  function actualizarContador() {
    const totalUnidades = productosCarrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    if (contador) {
      contador.textContent = totalUnidades;
      contador.classList.add("actualizado");
      setTimeout(() => contador.classList.remove("actualizado"), 300);
    }
  }

  function calcularTotal() {
    const total = productosCarrito.reduce((acc, prod) => {
      const precio = parseFloat(prod.precio.replace("€", "").replace(",", "."));
      return acc + precio * prod.cantidad;
    }, 0);
    if (totalCarrito) {
      totalCarrito.textContent = `Total: ${total.toFixed(2)} €`;
    }
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  }

  function renderCarrito() {
    carrito.innerHTML = "";
    productosCarrito.forEach(prod => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${prod.imagen}" width="40"></td>
        <td>${prod.nombre}</td>
        <td>${prod.precio}</td>
        <td>${prod.cantidad}</td>
        <td><a href="#" class="borrar-producto" data-id="${prod.id}">X</a></td>
      `;
      carrito.appendChild(row);
    });
    actualizarContador();
    calcularTotal();
  }

  function agregarProducto(producto) {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      producto.cantidad = 1;
      productosCarrito.push(producto);
    }
    guardarCarrito();
    renderCarrito();
  }

  function eliminarProducto(id) {
    productosCarrito = productosCarrito.filter(p => p.id !== id);
    guardarCarrito();
    renderCarrito();
  }

  function vaciarCarrito() {
    productosCarrito = [];
    guardarCarrito();
    renderCarrito();
  }

  // =========================
  // Eventos
  // =========================
  listaProductos.forEach(boton => {
    boton.addEventListener("click", e => {
      e.preventDefault();
      const product = e.target.closest(".product");
      const infoProducto = {
        imagen: product.querySelector("img").src,
        nombre: product.querySelector("h3").textContent,
        precio: product.querySelector(".precio").textContent,
        id: boton.getAttribute("data-id")
      };
      agregarProducto(infoProducto);
    });
  });

  vaciarBtn.addEventListener("click", e => {
    e.preventDefault();
    vaciarCarrito();
  });

  document.querySelector("#carrito").addEventListener("click", e => {
    if (e.target.classList.contains("borrar-producto")) {
      e.preventDefault();
      const id = e.target.getAttribute("data-id");
      eliminarProducto(id);
    }
  });

  // Inicialización
  renderCarrito();
});
