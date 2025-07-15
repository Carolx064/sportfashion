document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedor-noticias");

  // Verifica que el contenedor existe
  if (!contenedor) return;

  // Cargar noticias desde un archivo JSON externo
  fetch("noticias.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de noticias.");
      }
      return response.json();
    })
    .then(function (noticias) {
      noticias.forEach(function (noticia) {
        const noticiaDiv = document.createElement("div");
        noticiaDiv.classList.add("noticia");

        // Sanitizar contenido insertado con innerText (mejor que innerHTML si no hay HTML embebido)
        const titulo = document.createElement("h3");
        titulo.textContent = noticia.titulo;

        const contenido = document.createElement("p");
        contenido.textContent = noticia.contenido;

        noticiaDiv.appendChild(titulo);
        noticiaDiv.appendChild(contenido);
        contenedor.appendChild(noticiaDiv);
      });
    })
    .catch(function (error) {
      console.error("Error cargando noticias:", error.message);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuIcono = document.getElementById("menu-icono");
  const navbarLista = document.querySelector(".navbar ul");

  if (menuIcono && navbarLista) {
    menuIcono.addEventListener("click", function () {
      navbarLista.classList.toggle("active");
    });
  }
});
