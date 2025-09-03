document.addEventListener("DOMContentLoaded", () => {
  fetch("data/noticias.json")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar el archivo JSON");
      return response.json();
    })
    .then(noticias => {
      const contenedor = document.getElementById("contenedor-noticias");
      contenedor.innerHTML = "";

      noticias.forEach((noticia, index) => {
        const div = document.createElement("div");
        div.classList.add("noticia");
        div.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <p>${noticia.contenido}</p>
        `;

        // Delay para animación escalonada
        div.style.animationDelay = `${index * 0.2}s`;

        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error al cargar las noticias:", error);
      const contenedor = document.getElementById("contenedor-noticias");
      contenedor.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
    });
});
