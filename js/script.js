// script.js

const RUTA_JSON = '../data/noticias.json';

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
  contenedor.innerHTML = `<p style="color:red;">${mensaje}</p>`;
}

cargarNoticias();
