document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("nuevo-comentario-form");
    const comentariosContainer = document.querySelector(".comentarios");

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtén los valores del formulario
      const nombre = document.getElementById("nombre").value;
      const comentario = document.getElementById("comentario").value;

      // Crea un nuevo elemento de comentario con el mismo formato
      const nuevoComentario = document.createElement("div");
      nuevoComentario.classList.add("comentario");
      nuevoComentario.innerHTML = `
        <h4>${nombre}</h4>
        <p>${comentario}</p>
      `;

      // Agrega el nuevo comentario al contenedor de comentarios
      comentariosContainer.appendChild(nuevoComentario);

      // Limpia el formulario
      document.getElementById("nombre").value = "";
      document.getElementById("comentario").value = "";
    });
});
